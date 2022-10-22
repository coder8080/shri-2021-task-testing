import { describe, it, expect } from '@jest/globals';
import events from './utils/events';
import { screen } from '@testing-library/react';
import renderApplication from './utils/renderApplication';
import '@testing-library/jest-dom';

describe('Navbar', () => {
    it('в шапке отображаются ссылки на страницы магазина и на корзину', async () => {
        const { container } = renderApplication();
        const navbar = container.querySelector('.navbar');
        expect(navbar).toHaveTextContent('Example store');
        expect(navbar).toHaveTextContent('Catalog');
        expect(navbar).toHaveTextContent('Delivery');
        expect(navbar).toHaveTextContent('Contacts');
        expect(navbar).toHaveTextContent('Cart');
    });
    it('название магазина в шапке - ссылка на главную страницу', async () => {
        const { history } = renderApplication();
        const homeLink = screen.getByText('Example store');

        history.push('/delivery');
        await events.click(homeLink);
        const currentPathname = history.entries[2].pathname;
        expect(currentPathname).toBe('/');
    });
    it('при выборе элемента из меню "гамбургера" оно должно закрываться', async () => {
        const { container } = renderApplication();
        const navBartoggle = container.querySelector('.navbar-toggler-icon');
        const menu = container.querySelector('.navbar-collapse');
        const deliveryLink = screen.getByText('Delivery');

        await events.click(navBartoggle);
        await events.click(deliveryLink);

        expect(menu.classList).toContain('collapse');
    });
});
