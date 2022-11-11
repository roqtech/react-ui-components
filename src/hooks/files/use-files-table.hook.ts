export interface UseUserFilesTableInterface {
    parseFileSize: (bytes: number) => string;
}

export const useFilesTable = (): UseUserFilesTableInterface => {
    const roundNumber = (num: number) => Math.round(num * 100) / 100

    const parseFileSize = (bytes: number): string => {
        if (bytes <= 1024) {
            return `${bytes}B`;
        } else if (bytes <= (1024 * 1024)) {
            return `${roundNumber(bytes / 1024)}KB`;
        } else if (bytes <= (1024 * 1024 * 1024)) {
            return `${roundNumber(bytes / (1024 * 1024))}MB`;
        } else if (bytes <= (1024 * 1024 * 1024 * 1024)) {
            return `${roundNumber(bytes / (1024 * 1024 * 1024))}GB`;
        }
        return `${bytes}b`;
    }

    return {
        parseFileSize,
    }
}
