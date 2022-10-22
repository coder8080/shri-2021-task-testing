import {
    default as renderApplication,
    detailedProduct1,
} from '../utils/renderApplication';
import delay from 'delay';
import { screen } from '@testing-library/react';
import events from '../utils/events';

describe('Тесты корзины', () => {
    it('Содержимое корзины должно сохраняться между перезагрузками', async () => {
        const { history } = renderApplication({ useMockCart: false });
        history.push(`/catalog/${detailedProduct1.id}`);
        await delay(100);
        const addToCartButton = screen.getByText('Add to Cart');
        await events.click(addToCartButton);
        await events.click(addToCartButton);
        await events.click(addToCartButton);
        const { store } = renderApplication({ useMockCart: false });
        const state = store.getState();
        const cartState = state.cart;
        const count = cartState[String(detailedProduct1.id)]?.count;
        expect(count).toBe(3);
    });
});
