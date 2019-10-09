import React from 'react';
interface Props extends React.HTMLProps<HTMLElement> {
    /** List Item children */
    children: React.ReactNode;
}
declare function ListItem(props: Props): JSX.Element;
export { ListItem };
