import { APIResponse, Article, ISort, ShowRespInfo, Source, View } from '../../types/index';
import News from './news/news';
import { Sort } from './sort/sort';
import Sources from './sources/sources';

export class AppView implements View {
    private news: ShowRespInfo = new News();
    private sources: ShowRespInfo = new Sources();
    private sort: ISort = new Sort();

    public drawNews(data: APIResponse): void {
        const values: Readonly<Article>[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: APIResponse): void {
        const values: Readonly<Source>[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    public addSortFunctionality(): void {
        this.sort.addSorting();
    }
}

export default AppView;
