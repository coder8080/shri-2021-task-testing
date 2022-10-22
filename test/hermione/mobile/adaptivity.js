describe('Тесты адаптивности', () => {
    it('Главная страница', async ({ browser }) => {
        await browser.url('http://127.0.0.1:3000/hw/store');
        await browser.assertView('plain', '.Application', {
            ignoreElements: ['.Home'],
            compositeImage: false,
            allowViewportOverflow: true,
            selectorToScroll: '#root',
        });
    });
    it('Страница доставки', async ({ browser }) => {
        await browser.url('http://127.0.0.1:3000/hw/store/delivery');
        await browser.assertView('plain', '.Application', {
            ignoreElements: ['.Delivery'],
            compositeImage: false,
            tolerance: 5,
            allowViewportOverflow: true,
            selectorToScroll: '#root',
        });
    });
    it('Страница контактов', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/contacts');
        await browser.assertView('plain', '.Application', {
            ignoreElements: ['.Contacts'],
            compositeImage: false,
            allowViewportOverflow: true,
            selectorToScroll: '#root',
        });
    });
    it('Страница корзины', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/cart');
        await browser.assertView('plain', '.Application', {
            ignoreElements: ['.Cart'],
            compositeImage: false,
            allowViewportOverflow: true,
            selectorToScroll: '#root',
        });
    });
});
