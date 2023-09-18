import App from './components/app/app';
import './global.css';
import { IApp } from './types/index';

const app: IApp = new App();
app.start();
