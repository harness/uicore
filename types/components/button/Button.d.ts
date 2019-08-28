/// <reference types="react" />
import { IButtonProps } from '@blueprintjs/core';
interface Props extends Omit<IButtonProps, 'active'> {
    id: string;
    href?: string;
    target?: string;
}
export default function (props: Props): JSX.Element;
export {};
