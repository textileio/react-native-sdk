"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
class TextileImage extends React.Component {
    _onLoaded() {
        if (!this.props.onLoad) {
            return;
        }
        this.props.onLoad();
    }
    _onError(event) {
        // TODO: need the real type for Event here...
        if (!this.props.onError || !event.nativeEvent || !event.nativeEvent.message) {
            return;
        }
        this.props.onError(event.nativeEvent.message);
    }
    render() {
        const nativeProps = Object.assign({}, this.props, { forMinWidth: react_native_1.PixelRatio.getPixelSizeForLayoutSize(this.props.forMinWidth), onLoad: this._onLoaded.bind(this), onError: this._onError.bind(this) });
        return <TextileImageView {...nativeProps}/>;
    }
}
TextileImage.propTypes = {};
TextileImage.defaultProps = {};
exports.default = TextileImage;
//@ts-ignore
const TextileImageView = react_native_1.requireNativeComponent('TextileImageView', TextileImage);
