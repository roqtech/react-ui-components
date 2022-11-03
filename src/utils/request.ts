import { DocumentNode } from 'graphql/language/ast';
import { print } from 'graphql/language/printer';
import _get from 'lodash/get';

export interface IRequest {
    url: string
    query: string | DocumentNode,
    headers?: Record<string, unknown>,
    variables?: Record<string, unknown>
}

export const request = (args: IRequest, dataPath: string = '') => fetch(args.url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        ...(args.headers ?? {})
    },
    body: JSON.stringify({
        query: typeof args.query === 'object' ? print(args.query) : args.query,
        variables: args.variables ?? undefined
    })
}).then(async (_data) => {
    const data = await _data.json()
    if (dataPath) {
        return _get(data, dataPath)
    }
    return data
})
