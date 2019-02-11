export { default as CameraRoll } from './CameraRoll';
export { default as Protobufs } from '@textile/react-native-protobufs';
import * as API from './Textile/API';
import Events, { TextileEvents } from './Textile/events';
import Textile, { BackgroundTask } from './Textile';
export { Textile, API, Events, BackgroundTask, TextileEvents };
export * from './Textile/Models';
declare const _default: Textile;
export default _default;
