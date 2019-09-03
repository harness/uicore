import React from 'react';
export interface Props {
    /** A unique id to help Tooltip and UI Automation */
    id: string;
    /** Heading level ('1' -> h1, '2' -> h2, ..., '6' -> h6). Default is '1' */
    level?: '1' | '2' | '3' | '4' | '5' | '6';
    children: React.ReactNode;
}
export default function Heading({ level, id, children }: Props): JSX.Element;
