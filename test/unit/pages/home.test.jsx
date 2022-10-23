import renderApplication from '../utils/renderApplication';
import '@testing-library/jest-dom';

describe('Тесты главной странцы', () => {
    it('Главная страница существует', async () => {
        const { container } = renderApplication();
        const homePage = container.querySelector('.Home');
        expect(homePage).toBeInTheDocument();
    });
});
