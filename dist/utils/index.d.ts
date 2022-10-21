import { DocumentNode } from "graphql/language/ast";
export interface IRequest {
    url: string;
    query: DocumentNode;
    headers?: Record<string, unknown>;
    variables?: Record<string, unknown>;
}
export declare const request: (args: IRequest, dataPath?: string) => Promise<any>;
