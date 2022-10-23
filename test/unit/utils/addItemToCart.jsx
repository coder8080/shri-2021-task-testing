import events from './events';
import openPageAndWait from './openPageAndWait';
import { screen } from '@testing-library/react';

const addItemToCart = async ({ id, history, count }) => {
    history.push('/');
    await openPageAndWait({ history, address: `/catalog/${id}` });
    let addToCartButton = screen.getByText('Add to Cart');
    for (let i = 0; i < count; ++i) {
        await events.click(addToCartButton);
    }
};

export default addItemToCart;
