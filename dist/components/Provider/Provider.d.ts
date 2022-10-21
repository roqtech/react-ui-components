/// <reference types="react" />
export interface IRoqProvider {
    host: string;
    token: string;
}
export declare const RoqProvider: ({ children, config, withQueryClient }: {
    children: JSX.Element;
    config: Partial<IRoqProvider>;
    withQueryClient?: boolean | undefined;
}) => JSX.Element;
export declare const useRoq: () => {
    host: string;
    token: string;
};
export declare function useResolveProvider(args: Partial<IRoqProvider>): {
    host: string;
    token: string;
};
