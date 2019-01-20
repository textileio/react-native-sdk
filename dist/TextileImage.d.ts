import * as React from 'react';
import { ImageStyle, ImageProps } from 'react-native';
export interface OwnProps {
    target: string;
    index: number;
    forMinWidth: number;
    resizeMode: string;
    capInsets?: string;
    style?: ImageStyle | ImageStyle[];
    onLoad?: () => void;
    onError?: (error: string) => void;
}
declare type Props = OwnProps & Partial<ImageProps>;
export default class TextileImage extends React.Component<Props> {
    static propTypes: {};
    static defaultProps: {};
    _onLoaded(): void;
    _onError(event: any): void;
    render(): JSX.Element;
}
export {};
