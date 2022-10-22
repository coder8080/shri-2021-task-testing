import renderApplication from '../utils/renderApplication';

it('Главная страница существует', async () => {
    const { container, history } = renderApplication();
    const homePage = container.querySelector('.Home');
    expect(homePage).toBeTruthy();
});
