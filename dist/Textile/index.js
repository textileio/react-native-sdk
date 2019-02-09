"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const Models_1 = require("./Models");
const API_1 = __importDefault(require("./API"));
const store_1 = __importDefault(require("./store"));
const Events_1 = __importDefault(require("../Events"));
const migration_1 = __importDefault(require("./migration"));
const TextileEvents = __importStar(require("./events"));
const helpers_1 = require("./helpers");
const react_native_background_timer_1 = __importDefault(require("react-native-background-timer"));
const react_native_background_fetch_1 = __importDefault(require("react-native-background-fetch"));
const react_native_fs_1 = __importDefault(require("react-native-fs"));
const packageFile = require('./../../package.json');
exports.VERSION = packageFile.version;
const MIGRATION_NEEDED_ERROR = 'repo needs migration';
const INIT_NEEDED_ERROR = 'repo does not exist, initialization is required';
class Textile extends API_1.default {
    constructor(options) {
        super();
        // Temp instance of the app's redux store while I remove deps to it
        this.migration = new migration_1.default();
        this._debug = false;
        this._store = new store_1.default();
        this._nativeEvents = Events_1.default;
        this._config = {
            RELEASE_TYPE: 'development'
        };
        this._initialized = false;
        this.repoPath = `${react_native_fs_1.default.DocumentDirectoryPath}/textile-go`;
        this.isInitializedCheck = () => {
            if (!this._initialized) {
                TextileEvents.nonInitializedError();
                console.error('@textile/react-native-sdk: Attempt to call a Textile instance method on an uninitialized instance');
            }
        };
        /* ---- STATE BASED METHODS ----- */
        //  All methods here should only be called as the result of a sequenced kicked off
        //  By an event and detected by the persistent instance that executed setup()
        this.initializeAppState = () => __awaiter(this, void 0, void 0, function* () {
            const defaultAppState = 'default';
            // if for some reason initialized will ever be called from a non-blank state (?), we need the below
            // const storedState = await this._store.getAppState()
            // let defaultAppState = 'default' as TextileAppStateStatus
            // if (storedState) {
            //   defaultAppState = JSON.parse(storedState) as TextileAppStateStatus
            // }
            // wait just a moment in case we beat native state
            yield helpers_1.delay(10);
            const currentAppState = react_native_1.AppState.currentState;
            const queriedAppState = currentAppState || 'unknown';
            yield this.appStateChange(defaultAppState, queriedAppState);
        });
        this.startBackgroundTask = () => __awaiter(this, void 0, void 0, function* () {
            const shouldRun = yield this.shouldRunBackgroundTask();
            if (!shouldRun) {
                return;
            }
            yield this._store.setLastBackgroundEvent();
            const currentState = yield this.appState();
            // const currentState = yield select(TextileNodeSelectors.appState)
            // ensure we don't cause things in foreground
            if (currentState === 'background' || currentState === 'backgroundFromForeground') {
                yield this.appStateChange(currentState, 'background');
            }
        });
        // Simply create the node, useful only if you want to create in advance of starting
        this.createNode = () => __awaiter(this, void 0, void 0, function* () {
            const debug = this._config.RELEASE_TYPE !== 'production';
            yield this.updateNodeState(Models_1.NodeState.creating);
            const needsMigration = yield this.migration.requiresFileMigration(this.repoPath);
            if (needsMigration) {
                yield this.migration.runFileMigration(this.repoPath);
            }
            yield this.newTextile(this.repoPath, debug);
            yield this.updateNodeState(Models_1.NodeState.created);
        });
        // Start the node, create it if it doesn't exist. Safe to call on every start.
        this.createAndStartNode = () => __awaiter(this, void 0, void 0, function* () {
            // TODO
            /* In redux/saga world, we did a // yield call(() => task.done) to ensure this wasn't called
            while already running. Do we need the same check to ensure it doesn't happen here?
            */
            this.isInitializedCheck();
            const debug = this._config.RELEASE_TYPE !== 'production';
            const prevState = yield this._store.getNodeState();
            // if the known state isn't stopped, nonexistent, or in error... don't try to create it
            if (prevState && !(prevState.state === Models_1.NodeState.stopped ||
                prevState.state === Models_1.NodeState.nonexistent ||
                prevState.state === Models_1.NodeState.initializingRepo ||
                prevState.state === Models_1.NodeState.postMigration ||
                prevState.error)) {
                return;
            }
            try {
                yield this.createNode();
                yield this.updateNodeState(Models_1.NodeState.starting);
                yield this.start();
                const sessions = yield this.cafeSessions();
                if (!sessions || !sessions.values || sessions.values.length < 1) {
                    const cafeOverride = this._config.TEXTILE_CAFE_OVERRIDE;
                    if (cafeOverride) {
                        yield this.registerCafe(cafeOverride);
                    }
                    else if (this._config.TEXTILE_CAFE_GATEWAY_URL) {
                        yield this.discoverAndRegisterCafes();
                    }
                }
                yield this.updateNodeState(Models_1.NodeState.started);
                TextileEvents.startNodeFinished();
            }
            catch (error) {
                try {
                    if (error.message === MIGRATION_NEEDED_ERROR) {
                        // instruct the node to export data to files
                        yield this.migrateRepo(this.repoPath);
                        // store the fact there is a pending migration in the preferences redux persisted state
                        TextileEvents.migrationNeeded();
                        yield this.updateNodeState(Models_1.NodeState.postMigration);
                        // call the create/start sequence again
                        TextileEvents.createAndStartNode();
                    }
                    else if (error.message === INIT_NEEDED_ERROR) {
                        yield this.updateNodeState(Models_1.NodeState.creatingWallet);
                        const recoveryPhrase = yield this.newWallet(12);
                        TextileEvents.setRecoveryPhrase(recoveryPhrase);
                        yield this.updateNodeState(Models_1.NodeState.derivingAccount);
                        const walletAccount = yield this.walletAccountAt(recoveryPhrase, 0);
                        yield this.updateNodeState(Models_1.NodeState.initializingRepo);
                        yield this.initRepo(walletAccount.seed, this.repoPath, true, debug);
                        TextileEvents.createAndStartNode();
                        TextileEvents.walletInitSuccess();
                    }
                    else {
                        yield this.updateNodeStateError(error);
                    }
                }
                catch (error) {
                    yield this.updateNodeStateError(error);
                }
            }
        });
        // Useful if an app wishes to shut down the node
        this.shutDown = () => __awaiter(this, void 0, void 0, function* () {
            yield this.stopNode();
        });
        // Primarily an internal function
        this.manageNode = (previousState, newState) => __awaiter(this, void 0, void 0, function* () {
            this.isInitializedCheck();
            yield this._store.setAppState(newState);
            if (newState === 'active' || newState === 'background' || newState === 'backgroundFromForeground') {
                yield TextileEvents.appStateChange(previousState, newState);
            }
            if (newState === 'active' || newState === 'background') {
                this.createAndStartNode();
            }
            if (newState === 'background' || newState === 'backgroundFromForeground') {
                yield this.backgroundTaskRace();
            }
        });
        this.discoverAndRegisterCafes = () => __awaiter(this, void 0, void 0, function* () {
            this.initializeAppState();
            try {
                const cafes = yield helpers_1.createTimeout(10000, this.discoverCafes());
                const discoveredCafes = cafes;
                yield this.registerCafe(discoveredCafes.primary.url);
                yield this.registerCafe(discoveredCafes.secondary.url);
            }
            catch (error) {
                // When this happens, you should retry the discover and register...
                TextileEvents.newError('cafeDiscoveryError', 'cafe discovery timed out, internet connection needed');
            }
        });
        /* ----- STATE FREE PUBLIC SELECTORS ----- */
        this.isInitialized = () => {
            return this._initialized;
        };
        this.appState = () => __awaiter(this, void 0, void 0, function* () {
            const storedState = yield this._store.getAppState();
            const currentState = storedState || 'unknown';
            return currentState;
        });
        this.nodeOnline = () => __awaiter(this, void 0, void 0, function* () {
            const online = yield this._store.getNodeOnline();
            return !!online; // store can return void, in which case default return false
        });
        this.nodeState = () => __awaiter(this, void 0, void 0, function* () {
            const storedState = yield this._store.getNodeState();
            if (!storedState) {
                return Models_1.NodeState.nonexistent;
            }
            return storedState.state;
        });
        // Client should use this once account is onboarded to register with Cafe
        this.getCafeSessions = () => __awaiter(this, void 0, void 0, function* () {
            const sessions = yield this.cafeSessions();
            if (!sessions) {
                return [];
            }
            const values = sessions.values;
            if (!values) {
                return [];
            }
            else {
                return values;
            }
        });
        // Client should use this if cafe sessions are detected as expired
        this.getRefreshedCafeSessions = () => __awaiter(this, void 0, void 0, function* () {
            const sessions = yield this.cafeSessions();
            if (!sessions) {
                return [];
            }
            const values = sessions.values;
            if (!values) {
                return [];
            }
            else {
                const refreshedValues = yield Promise.all(values
                    .map((session) => __awaiter(this, void 0, void 0, function* () { return yield this.refreshCafeSession(session.id); }))
                    .filter((session) => session !== undefined));
                return refreshedValues;
            }
        });
        /* ------ INTERNAL METHODS ----- */
        this.shouldRunBackgroundTask = () => __awaiter(this, void 0, void 0, function* () {
            const MINIMUM_MINUTES_BETWEEN_TASKS = 10;
            const now = Number((new Date()).getTime());
            const last = yield this._store.getLastBackgroundEvent();
            // previous time set and set too recently
            if (last && (now - last) < 1000 * 60 * MINIMUM_MINUTES_BETWEEN_TASKS) {
                return false;
            }
            return true;
        });
        this.discoverCafes = () => __awaiter(this, void 0, void 0, function* () {
            if (!this._initialized) {
                TextileEvents.nonInitializedError();
                return;
            }
            const response = yield fetch(`${this._config.TEXTILE_CAFE_GATEWAY_URL}/cafes`, { method: 'GET' });
            if (response.status < 200 || response.status > 299) {
                throw new Error(`Status code error: ${response.statusText}`);
            }
            const discoveredCafes = yield response.json();
            return discoveredCafes;
        });
        this.updateNodeStateError = (error) => __awaiter(this, void 0, void 0, function* () {
            const storedState = yield this._store.getNodeState();
            const state = storedState ? storedState.state : Models_1.NodeState.nonexistent;
            yield this._store.setNodeState({ state, error: error.message });
        });
        this.nextAppState = (nextState) => __awaiter(this, void 0, void 0, function* () {
            const previousState = yield this.appState();
            // const currentState = this.store.getState().textileNode.appState
            const newState = nextState === 'background' && (previousState === 'active' || previousState === 'inactive') ? 'backgroundFromForeground' : nextState;
            if (newState !== previousState || newState === 'background') {
                yield this.appStateChange(previousState, newState);
            }
        });
        this.appStateChange = (previousState, nextState) => __awaiter(this, void 0, void 0, function* () {
            yield this.manageNode(previousState, nextState);
        });
        this.updateNodeState = (state) => __awaiter(this, void 0, void 0, function* () {
            const pastState = yield this._store.getNodeState();
            if (pastState && pastState.state === state) {
                return;
            }
            yield this._store.setNodeState({ state });
            TextileEvents.newNodeState(state);
        });
        /* ----- PRIVATE - EVENT EMITTERS ----- */
        this.stopNode = () => __awaiter(this, void 0, void 0, function* () {
            yield this.updateNodeState(Models_1.NodeState.stopping);
            yield this.stop();
            yield this._store.setNodeOnline(false);
            yield this.updateNodeState(Models_1.NodeState.stopped);
        });
        this.backgroundTaskRace = () => __awaiter(this, void 0, void 0, function* () {
            // This race cancels whichever effect looses the race, so a foreground event will cancel stopping the node
            //
            // Using the race effect, if we get a foreground event while we're waiting
            // to stop the node, cancel the stop and let it keep running
            yield react_native_background_timer_1.default.start();
            try {
                const ms = 20000;
                let cancelled = false;
                const foregroundEvent = react_native_1.DeviceEventEmitter.addListener('@textile/appNextState', (payload) => {
                    if (payload.nextState === 'active' && !cancelled) {
                        TextileEvents.stopNodeAfterDelayCancelled();
                        cancelled = true;
                    }
                });
                cancelSequence: while (!cancelled) {
                    TextileEvents.stopNodeAfterDelayStarting();
                    yield this.checkCafeMessages(); // do a quick check for new messages
                    yield helpers_1.delay(ms / 2);
                    if (cancelled) { // cancelled by event, so abort sequence
                        foregroundEvent.remove(); // remove our event listener
                        break cancelSequence;
                    }
                    yield this.checkCafeMessages();
                    yield helpers_1.delay(ms / 2);
                    if (cancelled) { // cancelled by event, so abort sequence
                        foregroundEvent.remove(); // remove our event listener
                        break cancelSequence;
                    }
                    // enter stopping sequence
                    foregroundEvent.remove(); // remove our event listener
                    TextileEvents.stopNodeAfterDelayFinishing();
                    yield this.stopNode(); // stop the node
                    cancelled = true; // be sure to exit the loop
                }
            }
            finally {
                // TODO: this might be better in a client provided callback
                yield react_native_background_fetch_1.default.finish(react_native_background_fetch_1.default.FETCH_RESULT_NEW_DATA);
                // Tells iOS that we are done with our background task so it's okay to suspend us
                yield react_native_background_timer_1.default.stop();
            }
        });
        if (options.debug) {
            this._debug = true;
        }
        console.info('Initializing @textile/react-native-sdk v. ' + exports.VERSION);
    }
    /* ---- Functions to wire into app ------ */
    backgroundFetch() {
        this.startBackgroundTask();
    }
    locationUpdate() {
        this.startBackgroundTask();
    }
    // De-register the listeners
    tearDown() {
        // Clear on out too if detected to help speed up any startup time
        // Clear all our listeners
        this._nativeEvents.removeAllListeners();
        // TODO: be sure to limit to only internal listeners (same above)
        react_native_1.DeviceEventEmitter.removeAllListeners();
        if (!this._config.SELF_MANAGE_APP_STATE) {
            react_native_1.AppState.removeEventListener('change', (nextState) => {
                TextileEvents.appNextState(nextState);
                this.nextAppState(nextState);
            });
        }
    }
    // setup should only be run where the class will remain persistent so that
    // listeners will be wired in to one instance only,
    setup(config) {
        // if config provided, set it
        if (config) {
            this._config = config;
        }
        // Clear storage to fresh state
        this._store.clear();
        // Clear state on setup
        // Setup our within sdk listeners
        this._nativeEvents.addListener('onOnline', () => {
            this._store.setNodeOnline(true);
        });
        react_native_1.DeviceEventEmitter.addListener('@textile/createAndStartNode', (payload) => {
            this.createAndStartNode();
        });
        if (!this._config.SELF_MANAGE_APP_STATE) {
            // SDK automatically detects app state changes manages the node
            react_native_1.AppState.addEventListener('change', (nextState) => {
                TextileEvents.appNextState(nextState);
                this.nextAppState(nextState);
            });
        }
        else {
            // Alternatively, the developer can trigger changes manually via an notifyAppStateChange event
            react_native_1.DeviceEventEmitter.addListener('@textile/notifyAppStateChange', (payload) => {
                if (!payload || !payload.nextState) {
                    return;
                }
                TextileEvents.appNextState(payload.nextState);
                this.nextAppState(payload.nextState);
            });
        }
        this.initializeAppState();
        this._initialized = true;
    }
}
exports.default = new Textile({});
