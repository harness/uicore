/// <reference types="react" />
import { IButtonProps } from '@blueprintjs/core';
interface Props extends Omit<IButtonProps, 'active'> {
    /** Each button must have a unique id to support E2E testing */
    id: string;
    /** When href is provided, Button becomes Link which renders as <a/> tag */
    href?: string;
    /** Target prop goes along with href */
    target?: string;
}
export default function (props: Props): JSX.Element;
export {};
