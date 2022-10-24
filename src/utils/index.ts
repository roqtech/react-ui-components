import _get from 'lodash/get'
import { DocumentNode } from "graphql/language/ast"
import { print } from "graphql/language/printer"

export interface IRequest {
  url: string
  query: string,
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
    query: args.query,
    variables: args.variables ?? undefined
  })
}).then(async (_data) => {
  const data = await _data.json()
  if (dataPath) {
    return _get(data, dataPath)
  }
  return data
})
