import { Options, Endpoint, errorRespStatuses, requestMethods, APIResponse } from '../../types/index';

abstract class Loader {
    private baseLink: string;
    private options: Partial<Options>;
    constructor(baseLink: string, options: Partial<Options>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T extends Pick<Options, 'endpoint' | 'options'>>(
        optionsObj: T,
        callback: CallableFunction = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(requestMethods.GET, optionsObj.endpoint, callback, optionsObj.options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (Object.values(errorRespStatuses).some((item: string | number) => +item === res.status))
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Pick<Options, 'endpoint' | 'options'> | object, endpoint: Endpoint): string {
        const urlOptions: Partial<Options> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: requestMethods,
        endpoint: Endpoint,
        callback: CallableFunction,
        options: Pick<Options, 'endpoint' | 'options'> | object = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<APIResponse> => res.json())
            .then((data: APIResponse): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
