import renderApplication from '../utils/renderApplication';
import '@testing-library/jest-dom';

describe('Тесты страницы доставки', () => {
    it('Страница доставки существует', () => {
        const { history, container } = renderApplication();
        history.push('/delivery');
        const deliveryPage = container.querySelector('.Delivery');
        expect(deliveryPage).toBeInTheDocument();
    });
});
