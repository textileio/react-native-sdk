import { EmitterSubscription } from 'react-native';
import { NodeState, TextileAppStateStatus } from './Models';
export declare type TextileEvents = 'newNodeState' | 'createAndStartNode' | 'startNodeFinished' | 'stopNodeAfterDelayStarting' | 'stopNodeAfterDelayCancelled' | 'stopNodeAfterDelayFinishing' | 'stopNodeAfterDelayComplete' | 'appStateChange' | 'updateProfile' | 'newErrorMessage' | 'appNextState' | 'migrationNeeded' | 'setRecoveryPhrase' | 'walletInitSuccess' | 'backgroundTask' | 'nodeOnline' | 'error';
export declare const publicEvents: {
    [key: string]: string;
};
export declare const privateEvents: {
    [key: string]: string;
};
export declare function newError(message: string, type: string): void;
export declare function nonInitializedError(): void;
export declare function backgroundTask(): void;
export declare function newNodeState(state: NodeState): void;
export declare function createAndStartNode(): void;
export declare function startNodeFinished(): void;
export declare function stopNodeAfterDelayStarting(): void;
export declare function stopNodeAfterDelayCancelled(): void;
export declare function stopNodeAfterDelayFinishing(): void;
export declare function stopNodeAfterDelayComplete(): void;
export declare function appStateChange(previousState: TextileAppStateStatus, newState: TextileAppStateStatus): void;
export declare function updateProfile(): void;
export declare function walletInitSuccess(): void;
export declare function setRecoveryPhrase(recoveryPhrase: string): void;
export declare function migrationNeeded(): void;
export declare function appNextState(nextState: string): void;
export declare function nodeOnline(online: boolean): void;
declare class Events {
    deviceEvents: EmitterSubscription[];
    addListener: (type: TextileEvents, listener: (data: any) => void, context?: any) => EmitterSubscription;
    removeListener: (type: TextileEvents, listener: (data: any) => void) => never;
    removeAllListeners: () => void;
}
export default Events;
