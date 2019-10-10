declare const Spacing: {
    XSMALL: "xsmall";
    SMALL: "small";
    MEDIUM: "medium";
    LARGE: "large";
    XLARGE: "xlarge";
    XXLARGE: "xxlarge";
    XXXLARGE: "xxxlarge";
    HUGE: "huge";
};
declare type Spacing = typeof Spacing[keyof typeof Spacing];
export { Spacing };
