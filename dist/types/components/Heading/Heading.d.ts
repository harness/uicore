/// <reference types="react" />
import { StyledProps } from '../../core/StyledProps';
declare type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6';
interface Props extends StyledProps {
    /** Heading level ('1' -> h1, '2' -> h2, ..., '6' -> h6). Default is '1' */
    level?: HeadingLevel;
}
/**
 * Heading renders consistent H1 to H6 elements.
 */
declare function Heading(props: Props): JSX.Element;
export { Heading };
