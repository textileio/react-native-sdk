import { StoredNodeState, TextileAppStateStatus } from './Models';
export default class TextileStore {
    keys: {
        [key: string]: string;
    };
    clear: () => Promise<void>;
    serialize: (data: any) => string;
    getLastBackgroundEvent: () => Promise<number | void>;
    getAppState: () => Promise<void | "active" | "background" | "inactive" | "unknown" | "backgroundFromForeground">;
    getNodeOnline: () => Promise<boolean | void>;
    getNodeState: () => Promise<void | StoredNodeState>;
    setLastBackgroundEvent: () => Promise<number | void>;
    setAppState: (newState: TextileAppStateStatus) => Promise<void>;
    setNodeOnline: (online: boolean) => Promise<void>;
    setNodeState: (item: StoredNodeState) => Promise<void>;
}
