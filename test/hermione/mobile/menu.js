describe('Тесты меню на мобильных устройствах', () => {
    it('На ширине меньше 576px навигационное меню скрывается за "гамбургер"', async ({
        browser,
    }) => {
        await browser.url('http://127.0.0.1:3000/hw/store');
        await browser.assertView('plain', '.navbar-toggler-icon', {
            compositeImage: false,
            allowViewportOverflow: true,
        });
    });
});
