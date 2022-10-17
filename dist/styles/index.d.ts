/// <reference types="react" />
declare const styled: <Type extends import("@stitches/react/types/util").Function | import("react").ComponentType<any> | keyof JSX.IntrinsicElements, Composers extends (string | import("@stitches/react/types/util").Function | import("react").ComponentType<any> | {
    [name: string]: unknown;
})[], CSS = import("@stitches/react/types/css-util").CSS<{}, {
    colors: {
        green1: string;
        green2: string;
        green3: string;
        green4: string;
        green5: string;
        green6: string;
        green7: string;
        green8: string;
        green9: string;
        green10: string;
        green11: string;
        green12: string;
        red1: string;
        red2: string;
        red3: string;
        red4: string;
        red5: string;
        red6: string;
        red7: string;
        red8: string;
        red9: string;
        red10: string;
        red11: string;
        red12: string;
        blue1: string;
        blue2: string;
        blue3: string;
        blue4: string;
        blue5: string;
        blue6: string;
        blue7: string;
        blue8: string;
        blue9: string;
        blue10: string;
        blue11: string;
        blue12: string;
        gray1: string;
        gray2: string;
        gray3: string;
        gray4: string;
        gray5: string;
        gray6: string;
        gray7: string;
        gray8: string;
        gray9: string;
        gray10: string;
        gray11: string;
        gray12: string;
    };
    fonts: {
        main: string;
    };
}, import("@stitches/react/types/config").DefaultThemeMap, {}>>(type: Type, ...composers: { [K in keyof Composers]: string extends Composers[K] ? Composers[K] : Composers[K] extends string | import("@stitches/react/types/util").Function | import("react").ComponentType<any> ? Composers[K] : import("@stitches/react/types/stitches").RemoveIndex<CSS> & {
    variants?: {
        [x: string]: {
            [x: string]: CSS;
            [x: number]: CSS;
        };
    } | undefined;
    compoundVariants?: (("variants" extends keyof Composers[K] ? Composers[K][keyof Composers[K] & "variants"] extends infer T ? { [Name in keyof T]?: import("@stitches/react/types/util").String | import("@stitches/react/types/util").Widen<keyof Composers[K][keyof Composers[K] & "variants"][Name]> | undefined; } : never : import("@stitches/react/types/util").WideObject) & {
        css: CSS;
    })[] | undefined;
    defaultVariants?: ("variants" extends keyof Composers[K] ? Composers[K][keyof Composers[K] & "variants"] extends infer T_1 ? { [Name_1 in keyof T_1]?: import("@stitches/react/types/util").String | import("@stitches/react/types/util").Widen<keyof Composers[K][keyof Composers[K] & "variants"][Name_1]> | undefined; } : never : import("@stitches/react/types/util").WideObject) | undefined;
} & CSS & (Composers[K] extends infer T_2 ? { [K2 in keyof T_2]: K2 extends "compoundVariants" | "defaultVariants" | "variants" ? unknown : K2 extends keyof CSS ? CSS[K2] : unknown; } : never); }) => import("@stitches/react/types/styled-component").StyledComponent<Type, import("@stitches/react/types/styled-component").StyledComponentProps<Composers>, {}, import("@stitches/react/types/css-util").CSS<{}, {
    colors: {
        green1: string;
        green2: string;
        green3: string;
        green4: string;
        green5: string;
        green6: string;
        green7: string;
        green8: string;
        green9: string;
        green10: string;
        green11: string;
        green12: string;
        red1: string;
        red2: string;
        red3: string;
        red4: string;
        red5: string;
        red6: string;
        red7: string;
        red8: string;
        red9: string;
        red10: string;
        red11: string;
        red12: string;
        blue1: string;
        blue2: string;
        blue3: string;
        blue4: string;
        blue5: string;
        blue6: string;
        blue7: string;
        blue8: string;
        blue9: string;
        blue10: string;
        blue11: string;
        blue12: string;
        gray1: string;
        gray2: string;
        gray3: string;
        gray4: string;
        gray5: string;
        gray6: string;
        gray7: string;
        gray8: string;
        gray9: string;
        gray10: string;
        gray11: string;
        gray12: string;
    };
    fonts: {
        main: string;
    };
}, import("@stitches/react/types/config").DefaultThemeMap, {}>>, theme: string & {
    className: string;
    selector: string;
} & {
    colors: {
        green1: import("@stitches/react/types/theme").Token<"green1", string, "colors", "">;
        green2: import("@stitches/react/types/theme").Token<"green2", string, "colors", "">;
        green3: import("@stitches/react/types/theme").Token<"green3", string, "colors", "">;
        green4: import("@stitches/react/types/theme").Token<"green4", string, "colors", "">;
        green5: import("@stitches/react/types/theme").Token<"green5", string, "colors", "">;
        green6: import("@stitches/react/types/theme").Token<"green6", string, "colors", "">;
        green7: import("@stitches/react/types/theme").Token<"green7", string, "colors", "">;
        green8: import("@stitches/react/types/theme").Token<"green8", string, "colors", "">;
        green9: import("@stitches/react/types/theme").Token<"green9", string, "colors", "">;
        green10: import("@stitches/react/types/theme").Token<"green10", string, "colors", "">;
        green11: import("@stitches/react/types/theme").Token<"green11", string, "colors", "">;
        green12: import("@stitches/react/types/theme").Token<"green12", string, "colors", "">;
        red1: import("@stitches/react/types/theme").Token<"red1", string, "colors", "">;
        red2: import("@stitches/react/types/theme").Token<"red2", string, "colors", "">;
        red3: import("@stitches/react/types/theme").Token<"red3", string, "colors", "">;
        red4: import("@stitches/react/types/theme").Token<"red4", string, "colors", "">;
        red5: import("@stitches/react/types/theme").Token<"red5", string, "colors", "">;
        red6: import("@stitches/react/types/theme").Token<"red6", string, "colors", "">;
        red7: import("@stitches/react/types/theme").Token<"red7", string, "colors", "">;
        red8: import("@stitches/react/types/theme").Token<"red8", string, "colors", "">;
        red9: import("@stitches/react/types/theme").Token<"red9", string, "colors", "">;
        red10: import("@stitches/react/types/theme").Token<"red10", string, "colors", "">;
        red11: import("@stitches/react/types/theme").Token<"red11", string, "colors", "">;
        red12: import("@stitches/react/types/theme").Token<"red12", string, "colors", "">;
        blue1: import("@stitches/react/types/theme").Token<"blue1", string, "colors", "">;
        blue2: import("@stitches/react/types/theme").Token<"blue2", string, "colors", "">;
        blue3: import("@stitches/react/types/theme").Token<"blue3", string, "colors", "">;
        blue4: import("@stitches/react/types/theme").Token<"blue4", string, "colors", "">;
        blue5: import("@stitches/react/types/theme").Token<"blue5", string, "colors", "">;
        blue6: import("@stitches/react/types/theme").Token<"blue6", string, "colors", "">;
        blue7: import("@stitches/react/types/theme").Token<"blue7", string, "colors", "">;
        blue8: import("@stitches/react/types/theme").Token<"blue8", string, "colors", "">;
        blue9: import("@stitches/react/types/theme").Token<"blue9", string, "colors", "">;
        blue10: import("@stitches/react/types/theme").Token<"blue10", string, "colors", "">;
        blue11: import("@stitches/react/types/theme").Token<"blue11", string, "colors", "">;
        blue12: import("@stitches/react/types/theme").Token<"blue12", string, "colors", "">;
        gray1: import("@stitches/react/types/theme").Token<"gray1", string, "colors", "">;
        gray2: import("@stitches/react/types/theme").Token<"gray2", string, "colors", "">;
        gray3: import("@stitches/react/types/theme").Token<"gray3", string, "colors", "">;
        gray4: import("@stitches/react/types/theme").Token<"gray4", string, "colors", "">;
        gray5: import("@stitches/react/types/theme").Token<"gray5", string, "colors", "">;
        gray6: import("@stitches/react/types/theme").Token<"gray6", string, "colors", "">;
        gray7: import("@stitches/react/types/theme").Token<"gray7", string, "colors", "">;
        gray8: import("@stitches/react/types/theme").Token<"gray8", string, "colors", "">;
        gray9: import("@stitches/react/types/theme").Token<"gray9", string, "colors", "">;
        gray10: import("@stitches/react/types/theme").Token<"gray10", string, "colors", "">;
        gray11: import("@stitches/react/types/theme").Token<"gray11", string, "colors", "">;
        gray12: import("@stitches/react/types/theme").Token<"gray12", string, "colors", "">;
    };
    fonts: {
        main: import("@stitches/react/types/theme").Token<"main", string, "fonts", "">;
    };
}, css: <Composers extends (string | import("@stitches/react/types/util").Function | import("react").JSXElementConstructor<any> | import("react").ExoticComponent<any> | {
    [name: string]: unknown;
})[], CSS = import("@stitches/react/types/css-util").CSS<{}, {
    colors: {
        green1: string;
        green2: string;
        green3: string;
        green4: string;
        green5: string;
        green6: string;
        green7: string;
        green8: string;
        green9: string;
        green10: string;
        green11: string;
        green12: string;
        red1: string;
        red2: string;
        red3: string;
        red4: string;
        red5: string;
        red6: string;
        red7: string;
        red8: string;
        red9: string;
        red10: string;
        red11: string;
        red12: string;
        blue1: string;
        blue2: string;
        blue3: string;
        blue4: string;
        blue5: string;
        blue6: string;
        blue7: string;
        blue8: string;
        blue9: string;
        blue10: string;
        blue11: string;
        blue12: string;
        gray1: string;
        gray2: string;
        gray3: string;
        gray4: string;
        gray5: string;
        gray6: string;
        gray7: string;
        gray8: string;
        gray9: string;
        gray10: string;
        gray11: string;
        gray12: string;
    };
    fonts: {
        main: string;
    };
}, import("@stitches/react/types/config").DefaultThemeMap, {}>>(...composers: { [K in keyof Composers]: string extends Composers[K] ? Composers[K] : Composers[K] extends string | import("@stitches/react/types/util").Function | import("react").JSXElementConstructor<any> | import("react").ExoticComponent<any> ? Composers[K] : import("@stitches/react/types/stitches").RemoveIndex<CSS> & {
    variants?: {
        [x: string]: {
            [x: string]: CSS;
            [x: number]: CSS;
        };
    } | undefined;
    compoundVariants?: (("variants" extends keyof Composers[K] ? Composers[K][keyof Composers[K] & "variants"] extends infer T ? { [Name in keyof T]?: import("@stitches/react/types/util").String | import("@stitches/react/types/util").Widen<keyof Composers[K][keyof Composers[K] & "variants"][Name]> | undefined; } : never : import("@stitches/react/types/util").WideObject) & {
        css: CSS;
    })[] | undefined;
    defaultVariants?: ("variants" extends keyof Composers[K] ? Composers[K][keyof Composers[K] & "variants"] extends infer T_1 ? { [Name_1 in keyof T_1]?: import("@stitches/react/types/util").String | import("@stitches/react/types/util").Widen<keyof Composers[K][keyof Composers[K] & "variants"][Name_1]> | undefined; } : never : import("@stitches/react/types/util").WideObject) | undefined;
} & CSS & (Composers[K] extends infer T_2 ? { [K2 in keyof T_2]: K2 extends "compoundVariants" | "defaultVariants" | "variants" ? unknown : K2 extends keyof CSS ? CSS[K2] : unknown; } : never); }) => import("@stitches/react/types/styled-component").CssComponent<import("@stitches/react/types/styled-component").StyledComponentType<Composers>, import("@stitches/react/types/styled-component").StyledComponentProps<Composers>, {}, CSS>;
export { styled, theme, css };
export declare const globalStyles: () => string;
