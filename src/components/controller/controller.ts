import { Endpoint, ILoader } from '../../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader implements ILoader {
    public getSources(callback: CallableFunction): void {
        super.getResp(
            {
                endpoint: Endpoint.sources,
                options: {},
            },
            callback
        );
    }

    public getNews(e: Event, callback: CallableFunction): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        while (target !== newsContainer) {
            if (
                !target ||
                !(target instanceof HTMLElement) ||
                !newsContainer ||
                !(newsContainer instanceof HTMLElement)
            ) {
                return;
            }
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoint.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
