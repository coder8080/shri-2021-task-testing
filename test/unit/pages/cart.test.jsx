import {
    default as renderApplication,
    detailedProduct1,
    detailedProduct2,
} from '../utils/renderApplication';
import { screen } from '@testing-library/react';
import events from '../utils/events';
import addItemToCart from '../utils/addItemToCart';
import addTwoItems from '../utils/addTwoItems';
import '@testing-library/jest-dom';

describe('Тесты страницы корзины', () => {
    it('Содержимое корзины должно сохраняться между перезагрузками', async () => {
        const { history } = renderApplication({ useMockCart: false });
        await addItemToCart({ id: detailedProduct1.id, history, count: 3 });
        const { store } = renderApplication({ useMockCart: false });
        const state = store.getState();
        const cartState = state.cart;
        const count = cartState[String(detailedProduct1.id)]?.count;
        expect(count).toBe(3);
    });
    it('В шапке рядом со ссылкой на корзину отображается количество неповторяющихся товаров в ней', async () => {
        const { container, history } = renderApplication();

        await addTwoItems({ history });
        const navbarNav = container.querySelector('.navbar-nav');
        expect(navbarNav).toHaveTextContent('Cart (2)');
    });
    it('В корзине отображается таблица с добавленными в нее товарами', async () => {
        const { container, history, store } = renderApplication();
        const products = [detailedProduct1, detailedProduct2];
        await addTwoItems({ history });
        history.push('/cart');
        const tableBody = container.querySelector('.Cart-Table tbody');
        const rows = tableBody.children;
        const cartState = store.getState().cart;
        for (let i = 0; i < 2; ++i) {
            const row = rows[i];
            const currentProduct = cartState[String(products[i].id)];
            expect(row).toBeTruthy();
            expect(row).toHaveTextContent(
                `${i + 1}${currentProduct.name}$${currentProduct.price}${
                    currentProduct.count
                }$${currentProduct.count * currentProduct.price}`
            );
        }
    });
    it('В корзине отображается общая сумма заказа', async () => {
        const { container, history } = renderApplication();
        await addTwoItems({ history });
        history.push('/cart');
        const orderPrice = container.querySelector('.Cart-OrderPrice');
        expect(orderPrice).toHaveTextContent('$1789');
    });
    it('Присутствует кнопка "очистить корзину"', async () => {
        const { container, history } = renderApplication();
        await addTwoItems({ history });
        history.push('/cart');
        const clearCartButton = screen.getByText('Clear shopping cart');
        expect(clearCartButton).toBeInTheDocument();
    });
    it('По нажатию на кнопку "очистить корзину" все товары удаляются', async () => {
        const { history, store } = renderApplication();
        await addTwoItems({ history });
        history.push('/cart');
        const clearCartButton = screen.getByText('Clear shopping cart');
        await events.click(clearCartButton);
        const state = store.getState();
        const cartState = state.cart;
        const cartItemsArray = Object.entries(cartState);
        expect(cartItemsArray.length).toBe(0);
    });
    it('Если корзина пустая, отображается ссылка на каталог товаров', async () => {
        const { history } = renderApplication();
        await addTwoItems({ history });
        history.push('/cart');
        const clearCartButton = screen.getByText('Clear shopping cart');
        await events.click(clearCartButton);
        const catalogLink = screen.getByText('catalog');
        await events.click(catalogLink);
        const entries = history.entries;
        const lastEntry = entries[entries.length - 1];
        const pathName = lastEntry.pathname;
        expect(pathName).toBe('/catalog');
    });
});
