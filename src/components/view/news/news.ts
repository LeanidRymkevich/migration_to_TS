import { Article, ShowRespInfo } from '../../../types/index';
import './news.css';

class News implements ShowRespInfo {
    public draw(data: Readonly<Article>[]): void {
        const news: Readonly<Article>[] = data.length >= 10 ? data.slice(0, 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        const newsHTML: HTMLElement | null = document.querySelector('.news');

        if (!newsItemTemp || !newsHTML) {
            throw new Error('There is no news-wrapper or news-template in the index.html!');
        }

        news.forEach((item: Readonly<Article>, idx: number): void => {
            const newsClone: Node | null = this.getFilledHTMLElement(newsItemTemp, item, idx);
            if (newsClone) {
                fragment.append(newsClone);
            }
        });

        newsHTML.innerHTML = '';
        newsHTML.appendChild(fragment);
    }

    private getFilledHTMLElement(newsItemTemp: HTMLTemplateElement, item: Readonly<Article>, idx: number): Node | null {
        const newsClone: Node = newsItemTemp.content.cloneNode(true);

        if (!(newsClone instanceof DocumentFragment)) return null;

        const newsItem: HTMLElement | null = newsClone.querySelector('.news__item');
        const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
        const newsMetaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
        const newsMetaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
        const newsMetaTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
        const newsMetaSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
        const newsMetaContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
        const newsMetaLink: HTMLElement | null = newsClone.querySelector('.news__read-more a');

        const imageURL = `url(${item.urlToImage || './assets/images/news_placeholder.jpg'})`;
        const publisher: string = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
        const author: string = item.author || item.source.name;

        if (!newsItem || !newsMetaTitle || !newsMetaContent) {
            return null; // it's reasonless to add an article without its title or content
        }
        if (idx % 2) newsItem.classList.add('alt');
        newsMetaTitle.textContent = item.title;
        newsMetaContent.textContent = item.description;
        if (newsMetaPhoto) newsMetaPhoto.style.backgroundImage = imageURL;
        if (newsMetaAuthor) newsMetaAuthor.textContent = author;
        if (newsMetaDate) newsMetaDate.textContent = publisher;
        if (newsMetaSource) newsMetaSource.textContent = item.source.name;
        if (newsMetaLink) newsMetaLink.setAttribute('href', item.url);
        return newsClone;
    }
}

export default News;
