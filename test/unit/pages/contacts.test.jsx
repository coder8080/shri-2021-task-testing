import renderApplicationfrom from '../utils/renderApplication';
import '@testing-library/jest-dom';

describe('Тесты страницы контактов', () => {
    it('Страница контактов существует', () => {
        const { container, history } = renderApplicationfrom();
        history.push('/contacts');
        const contactsPage = container.querySelector('.Contacts');
        expect(contactsPage).toBeInTheDocument();
    });
});
