import addItemToCart from './addItemToCart';
import { detailedProduct1, detailedProduct2 } from './renderApplication';

const addTwoItems = async ({ history }) => {
    await addItemToCart({ id: detailedProduct1.id, history, count: 3 });
    await addItemToCart({ id: detailedProduct2.id, history, count: 2 });
};

export default addTwoItems;
