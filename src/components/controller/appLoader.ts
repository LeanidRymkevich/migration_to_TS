import Loader from './loader';

abstract class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '8797a943de9744cb8236fd189392092c', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
