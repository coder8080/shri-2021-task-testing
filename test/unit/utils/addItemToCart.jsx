import events from './events';
import delay from 'delay';
import { screen } from '@testing-library/react';

const addItemToCart = async ({ id, history, count }) => {
    history.push('/');
    history.push(`/catalog/${id}`);
    await delay(50);
    let addToCartButton = screen.getByText('Add to Cart');
    for (let i = 0; i < count; ++i) {
        await events.click(addToCartButton);
    }
};

export default addItemToCart;
