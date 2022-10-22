import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Application } from '../../../src/client/Application';
import { CartApi } from '../../../src/client/api';
import { initStore } from '../../../src/client/store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const basename = '/hw/store';

export const stubProducts1 = [
    { id: 0, name: 'Practical Bike', price: 637 },
    { id: 1, name: 'Awesome Soap', price: 978 },
    { id: 2, name: 'Generic Computer', price: 528 },
    { id: 3, name: 'Rustic Gloves', price: 543 },
    { id: 4, name: 'Rustic Shirt', price: 657 },
    { id: 5, name: 'Refined Pizza', price: 401 },
    { id: 6, name: 'Unbranded Soap', price: 445 },
    { id: 7, name: 'Fantastic Mouse', price: 508 },
    { id: 8, name: 'Generic Ball', price: 38 },
    { id: 9, name: 'Gorgeous Pizza', price: 870 },
    { id: 10, name: 'Unbranded Ball', price: 402 },
];

export const stubProducts2 = [
    { id: 11, name: 'Licensed Fish', price: 599 },
    { id: 12, name: 'Sleek Bacon', price: 121 },
    { id: 13, name: 'Sleek Mouse', price: 149 },
    { id: 14, name: 'Rustic Fish', price: 957 },
    { id: 15, name: 'Fantastic Chair', price: 948 },
    { id: 16, name: 'Small Bacon', price: 404 },
    { id: 17, name: 'Tasty Hat', price: 254 },
    { id: 18, name: 'Handmade Cheese', price: 901 },
    { id: 19, name: 'Handmade Car', price: 937 },
    { id: 20, name: 'Fantastic Tuna', price: 314 },
];

export const detailedProduct1 = {
    id: 0,
    name: 'Small Mouse',
    description:
        'The slim & simple Maple Gaming Keyboard from Dev Byte' +
        ' comes with a sleek body and 7- Color RGB LED Back-lighting' +
        ' for smart functionality',
    price: 197,
    color: 'salmon',
    material: 'Soft',
};

export const detailedProduct2 = {
    id: 11,
    name: 'Licensed Fish',
    description:
        "Boston's most advanced compression wear technology increases" +
        ' muscle oxygenation, stabilizes active muscles',
    price: 599,
    color: 'magenta',
    material: 'Soft',
};

class subApi {
    constructor(stubProducts, detailedProduct) {
        this.stubProducts = stubProducts;
        this.detailedProduct = detailedProduct;
    }
    async getProducts() {
        return { data: this.stubProducts };
    }

    async getProductById(id) {
        return { data: this.detailedProduct };
    }

    async checkout(form, cart) {
        return;
    }
}

class stubCartApi {
    constructor() {
        this.state = {};
    }
    getState() {
        return this.state;
    }

    setState(cart) {
        this.state = cart;
    }
}

const renderApplication = ({ apiVar = 1, useMockCart = true } = {}) => {
    const cart = useMockCart ? new stubCartApi() : new CartApi();
    const history = createMemoryHistory({
        initialEntries: ['/'],
        initialIndex: 0,
    });
    let api = null;
    if (apiVar === 1) {
        api = new subApi(stubProducts1, detailedProduct1);
    } else {
        api = new subApi(stubProducts2, detailedProduct2);
    }
    const store = initStore(api, cart);
    const application = (
        <Router basename={basename} history={history}>
            <Provider store={store}>
                <Application />
            </Provider>
        </Router>
    );
    return { ...render(application), history, store };
};

export default renderApplication;
