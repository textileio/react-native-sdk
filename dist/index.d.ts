export { default as Events } from './Events';
export { default as CameraRoll } from './CameraRoll';
export { default as Protobufs } from '@textile/react-native-protobufs';
import * as API from './Textile/API';
import Textile, { newBackgroundTask } from './Textile';
export { Textile, API, newBackgroundTask };
export * from './Textile/Models';
declare const _default: Textile;
export default _default;
