import renderApplication from './renderApplication';
import delay from 'delay';

const openPageAndWait = async (address, ...args) => {
    const params = renderApplication(...args);
    params.history.push(address);
    await delay(50);
    return params;
};

export const openCatalogPage = (...args) =>
    openPageAndWait('/catalog', ...args);

export default openPageAndWait;
