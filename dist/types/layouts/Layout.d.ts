/// <reference types="react" />
import { StyledProps } from '../core/StyledProps';
declare type Props = Pick<StyledProps, 'children' | 'margin'>;
declare function Vertical(props: Props): JSX.Element;
declare function Horizontal(props: Props): JSX.Element;
declare const Layout: {
    Vertical: typeof Vertical;
    Horizontal: typeof Horizontal;
};
export { Layout };
