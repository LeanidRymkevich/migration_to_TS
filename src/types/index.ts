export interface APIResponse {
    status: string;
    totalResults?: number;
    articles?: Article[];
    sources?: Source[];
}

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ShowRespInfo {
    draw(data: Source[] | Article[]): void;
}

export interface View {
    drawNews(data: APIResponse): void;
    drawSources(data: APIResponse): void;
    addSortFunctionality(): void;
}

export interface ILoader {
    getSources(callback: CallableFunction): void;
    getNews(e: Event, callback: CallableFunction): void;
}

export interface IApp {
    start(): void;
}

export interface ISort {
    addSorting(): void;
}

export type Options = {
    [key: string]: string | Endpoint | object;
    apiKey: string;
    endpoint: Endpoint;
    options: { sources: string } | object;
};

export enum Endpoint {
    everything = 'everything',
    sources = 'sources',
}

export enum requestMethods {
    GET = 'GET',
}

export enum errorRespStatuses {
    unauthorized = 401,
    notFound = 404,
}
