/// <reference types="react" />
import { Intent } from './Intent';
import { Spacing } from './Spacing';
import { KVO } from './Types';
/**
 * Styled Props: Define reusable styles across components.
 * Inspired by https://styled-system.com/theme-specification
 */
export interface StyledProps {
    /** Component intent */
    intent?: Intent;
    /** Make text bold */
    bold?: boolean;
    /** Render component as inline block */
    inline?: boolean;
    /** Mark component as being muted. Usually used for text */
    muted?: boolean;
    /** Set font family to mono. Ussually used in for code or snippet */
    mono?: boolean;
    /** Component font size */
    font?: Spacing;
    /** Component flex layout. Use in commbination with flexAlign and flexDistribution */
    flex?: boolean;
    /** Component children flex layout content alignment (Note: Not everything below is implemented) */
    flexAlign?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    /** Component children flex layout content distribution */
    flexDistribution?: 'space-between';
    /** Component border */
    border?: boolean;
    /** Component margin. Usually used for containers */
    margin?: Spacing;
    /** Component padding. Usually used for containers */
    padding?: Spacing;
    /** Component children */
    children: React.ReactNode;
}
/** Generate classes from styled props */
export declare function styledClasses(props: StyledProps, className?: string): string;
/** Return all props that are not styled props */
export declare function omitStyledProps(props: KVO): KVO;
