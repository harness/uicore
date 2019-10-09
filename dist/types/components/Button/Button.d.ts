/// <reference types="react" />
import { IButtonProps } from '@blueprintjs/core';
interface Props extends Omit<IButtonProps, 'active'> {
    /** Each button must have a unique id to support E2E testing */
    id: string;
}
declare function Button(props: Props): JSX.Element;
export { Button };
