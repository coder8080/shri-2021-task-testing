import openPageAndWait from '../utils/openPageAndWait';
import addItemToCart from '../utils/addItemToCart';
import renderApplication, {
    detailedProduct1,
    detailedProduct2,
} from '../utils/renderApplication';
import { screen } from '@testing-library/react';
import events from '../utils/events';
import '@testing-library/jest-dom';
import delay from 'delay';

describe('Тесты страницы с подробной информацией', () => {
    describe('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
        it('Товар #1', async () => {
            const { container } = await openPageAndWait(
                `/catalog/${detailedProduct1.id}`,
                { apiVar: 1 }
            );
            expect(container).toHaveTextContent(detailedProduct1.name);
            expect(container).toHaveTextContent(detailedProduct1.description);
            expect(container).toHaveTextContent(detailedProduct1.price);
            expect(container).toHaveTextContent(detailedProduct1.color);
            expect(container).toHaveTextContent(detailedProduct1.material);
            expect(container).not.toHaveTextContent('Item in cart');
        });
        it('Товар #2', async () => {
            const { container } = await openPageAndWait(
                `/catalog/${detailedProduct2.id}`,
                { apiVar: 2 }
            );
            expect(container).toHaveTextContent(detailedProduct2.name);
            expect(container).toHaveTextContent(detailedProduct2.description);
            expect(container).toHaveTextContent(detailedProduct2.price);
            expect(container).toHaveTextContent(detailedProduct2.color);
            expect(container).toHaveTextContent(detailedProduct2.material);
            expect(container).not.toHaveTextContent('Item in cart');
        });
    });
    it('Если товар уже добавлен в корзину, то на странице товара должно отображаться сообщение об этом', async () => {
        const { container } = await openPageAndWait(
            `/catalog/${detailedProduct1.id}`
        );
        const addToCart = screen.getByText('Add to Cart');
        await events.click(addToCart);
        expect(container).toHaveTextContent('Item in cart');
    });
    describe('Кнопка "добавить в корзину"', () => {
        it('Нажатие кнопки "добавить в корзину" добавляет товар в корзину', async () => {
            const { store, history } = renderApplication();
            await addItemToCart({ id: detailedProduct1.id, history, count: 1 });
            const state = store.getState();
            const cartState = state.cart;
            const cartItems = Object.entries(cartState);
            const cartItemId = cartItems[0][0];
            const cartItem = cartItems[0][1];
            expect(cartItemId).toBe(String(detailedProduct1.id));
            expect(cartItem.name).toBe(detailedProduct1.name);
            expect(cartItem.count).toBe(1);
            expect(cartItem.price).toBe(detailedProduct1.price);
            expect(cartItems.length).toBe(1);
        });
        it('Повторное нажатие кнопки "добавить в корзину" увеличивает количество товара', async () => {
            const { store, history } = renderApplication();
            history.push(`/catalog/${detailedProduct1.id}`);
            await delay(100);
            const addToCartButton = screen.getByText('Add to Cart');
            await events.click(addToCartButton);
            await events.click(addToCartButton);
            await events.click(addToCartButton);
            const state = store.getState();
            const cartState = state.cart;
            const count = cartState[String(detailedProduct1.id)]?.count;
            expect(count).toBe(3);
        });
    });
});
