import renderApplication from './renderApplication';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const openPageAndWait = async ({ history, address }) => {
    history.push(address);
    await waitFor(() => {
        try {
            const loading = screen.getByText('LOADING');
            return false;
        } catch (e) {
            return true;
        }
    });
};

export const openCatalogPage = async (...args) => {
    const params = renderApplication(...args);
    await openPageAndWait({ address: '/catalog', history: params.history });
    return params;
};

export default openPageAndWait;
