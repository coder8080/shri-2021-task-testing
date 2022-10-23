import renderApplication from '../utils/renderApplication';
import openPageAndWait, { openCatalogPage } from '../utils/openPageAndWait';
import {
    stubProducts1,
    stubProducts2,
    detailedProduct1,
} from '../utils/renderApplication';
import { screen } from '@testing-library/react';
import events from '../utils/events';
import '@testing-library/jest-dom';

describe('Тесты каталога', () => {
    it('Страница каталога существует', async () => {
        const { container } = await openCatalogPage();
        const catalogPage = container.querySelector('.Catalog');
        expect(catalogPage).toBeTruthy();
    });

    describe('Для каждого товара в каталоге отображается название, цена и ссылка, полученные с сервера', () => {
        it('Набор данных #1', async () => {
            const { container } = await openCatalogPage();
            const catalogPage = container.querySelector('.Catalog');
            const row = catalogPage.children[1];
            const cols = row.children;
            for (let i = 0; i < cols.length; ++i) {
                const title = cols[i].querySelector('h5.card-title');
                expect(title).toHaveTextContent(stubProducts1[i].name);
                const price = cols[i].querySelector('p.ProductItem-Price');
                expect(price).toHaveTextContent(stubProducts1[i].price);
                const link = cols[i].querySelector('a.card-link');
                const desiredLinkAddress = `http://127.0.0.1:3000/catalog/${stubProducts1[i].id}`;
                expect(link.href).toBe(desiredLinkAddress);
            }
        });

        it('Набор данных #2', async () => {
            const { container } = await openCatalogPage({ apiVar: 2 });
            const catalogPage = container.querySelector('.Catalog');
            const row = catalogPage.children[1];
            const cols = row.children;
            for (let i = 0; i < cols.length; ++i) {
                const title = cols[i].querySelector('h5.card-title');
                expect(title).toHaveTextContent(stubProducts2[i].name);
                const price = cols[i].querySelector('p.ProductItem-Price');
                expect(price).toHaveTextContent(stubProducts2[i].price);
                const link = cols[i].querySelector('a.card-link');
                const desiredLinkAddress = `http://127.0.0.1:3000/catalog/${stubProducts2[i].id}`;
                expect(link.href).toBe(desiredLinkAddress);
            }
        });
    });

    it('Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом', async () => {
        const { history } = renderApplication({ apiVar: 1 });
        await openPageAndWait({
            history,
            address: `/catalog/${detailedProduct1.id}`,
        });
        const addToCartButton = screen.getByText('Add to Cart');
        await events.click(addToCartButton);
        await openPageAndWait({
            history,
            address: '/catalog',
        });
        const card = screen.getAllByTestId(String(detailedProduct1.id))[0];
        expect(card).toHaveTextContent('Item in cart');
    });
});
