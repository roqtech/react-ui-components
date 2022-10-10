/// <reference types="react" />
declare type Optional<T> = T | null;
interface ICtx {
    host: string;
    token?: Optional<string>;
}
export declare const RoqProvider: ({ children, config, withQueryClient }: {
    children: JSX.Element;
    config: Partial<ICtx>;
    withQueryClient?: boolean | undefined;
}) => JSX.Element;
export declare const useRoq: () => ICtx;
export {};
