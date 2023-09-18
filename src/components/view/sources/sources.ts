import { ShowRespInfo, Source } from '../../../types/index';
import './sources.css';

class Sources implements ShowRespInfo {
    public draw(data: Readonly<Source>[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        const sourceHTML: HTMLElement | null = document.querySelector('.sources');

        if (!sourceItemTemp || !sourceHTML) {
            throw new Error('There is no source-wrapper or source-template in the index.html!');
        }

        data.forEach((item: Readonly<Source>): void => {
            const sourceClone: Node | null = this.getFilledHTMLElement(sourceItemTemp, item);
            if (sourceClone) {
                fragment.append(sourceClone);
            }
        });

        sourceHTML.append(fragment);
    }

    private getFilledHTMLElement(sourceItemTemp: HTMLTemplateElement, item: Readonly<Source>): Node | null {
        const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

        if (!(sourceClone instanceof DocumentFragment)) return null;

        const sourceItem: HTMLElement | null = sourceClone.querySelector('.source__item');
        const sourceItemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');

        if (!sourceItem || !sourceItemName) return null;
        sourceItem.setAttribute('data-source-id', item.id);
        sourceItemName.textContent = item.name;
        return sourceClone;
    }
}

export default Sources;
