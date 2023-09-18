import { ISort } from '../../../types/index';
import './sort.css';

export class Sort implements ISort {
    private sortBtnText: Record<string, string> = {
        direct: 'A → Z',
        reverse: 'Z → A',
    };

    private directSort = true;

    public addSorting(): void {
        const sortBtn: HTMLButtonElement | null = document.querySelector('.sort__button');
        const sortInput: HTMLInputElement | null = document.querySelector('.sort__input');

        if (sortBtn) sortBtn.addEventListener('click', (): void => this.sortBtnHandler(sortBtn));
        if (sortInput) sortInput.addEventListener('input', (): void => this.sortInputHandler(sortInput));
    }

    private sortBtnHandler(btn: HTMLButtonElement): void {
        const publishers: HTMLElement[] = Array.from(document.querySelectorAll('.source__item-name'));

        if (this.directSort) {
            this.directSort = false;
            btn.textContent = this.sortBtnText.reverse;
            publishers.sort((a: HTMLElement, b: HTMLElement): number =>
                !b.textContent ? -1 : !a.textContent ? 1 : b.textContent.localeCompare(a.textContent)
            );
            publishers.forEach((item: HTMLElement, index: number): void => {
                if (item.parentElement) item.parentElement.style.order = `${index}`;
            });
        } else {
            this.directSort = true;
            btn.textContent = this.sortBtnText.direct;
            publishers.sort((a: HTMLElement, b: HTMLElement): number =>
                !a.textContent ? -1 : !b.textContent ? 1 : a.textContent.localeCompare(b.textContent)
            );
            publishers.forEach((item: HTMLElement, index: number): void => {
                if (item.parentElement) item.parentElement.style.order = `${index}`;
            });
        }
    }

    private sortInputHandler(input: HTMLInputElement): void {
        const publishers: HTMLElement[] = Array.from(document.querySelectorAll('.source__item-name'));

        if (input.value === '') {
            publishers.forEach((item: HTMLElement): void => {
                item.parentElement?.classList.remove('source__item_hidden');
            });
        } else {
            publishers.forEach((item: HTMLElement): void => {
                if (item.textContent?.toLocaleLowerCase().includes(input.value.toLocaleLowerCase())) {
                    item.parentElement?.classList.remove('source__item_hidden');
                } else {
                    item.parentElement?.classList.add('source__item_hidden');
                }
            });
        }
    }
}
