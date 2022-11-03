import { useRoq } from 'src/components/Provider';
import { IRequest, request } from 'src/utils';

export const useRoqRequest = (args: Omit<IRequest, 'url'>, dataPath: string = '') => {
    const { token, host: url } = useRoq();
    return request({
        ...args,
        url,
        headers: {
            ...args.headers,
            'roq-platform-authorization': token as string,
        }
    })
}
