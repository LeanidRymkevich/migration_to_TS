import { APIResponse, View, ILoader, IApp } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App implements IApp {
    private controller: ILoader = new AppController();
    private view: View = new AppView();

    public start(): void {
        const sourcesHTML: HTMLElement | null = document.querySelector('.sources');
        if (sourcesHTML) {
            sourcesHTML.addEventListener('click', (e: Event): void =>
                this.controller.getNews(e, (data: APIResponse): void => this.view.drawNews(data))
            );
            this.controller.getSources((data: APIResponse): void => this.view.drawSources(data));
            this.view.addSortFunctionality();
        }
    }
}

export default App;
