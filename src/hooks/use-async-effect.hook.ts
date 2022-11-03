import { useEffect } from 'react';

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30551#issuecomment-461913188
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAsyncEffect = (effect: () => Promise<void | (() => void)>, deps?: any[]): void =>
    useEffect(() => {
        const cleanupPromise = effect();

        return () => {
            void cleanupPromise.then(cleanup => cleanup && cleanup());
        }
    }, deps);
