describe('Страницы статичны', () => {
    it('Главная страница статична', async ({ browser }) => {
        await browser.url('http://127.0.0.1:3000/hw/store');
        await browser.assertView('plain', '.Home', {
            compositeImage: false,
            allowViewportOverflow: true,
            selectorToScroll: '#root',
        });
    });
    it('Страница доставки статична', async ({ browser }) => {
        await browser.url('http://127.0.0.1:3000/hw/store/delivery');
        await browser.assertView('plain', '.Delivery', {
            compositeImage: false,
            allowViewportOverflow: true,
            selectorToScroll: '#root',
        });
    });

    it('Страница контактов статична', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/contacts');
        await browser.assertView('plain', '.Contacts', {
            compositeImage: false,
            allowViewportOverflow: true,
            selectorToScroll: '#root',
        });
    });
});
