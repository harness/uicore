import React from 'react';
interface Props extends React.HTMLProps<HTMLElement> {
    /** If true, render List as an ordered list, default is false */
    ordered?: boolean;
    /** List children */
    children: React.ReactNode;
}
declare function List(props: Props): JSX.Element;
export { List };
