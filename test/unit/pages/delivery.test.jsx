import renderApplication from '../utils/renderApplication';

it('Страница доставки существует', () => {
    const { history, container } = renderApplication();
    history.push('/delivery');
    const deliveryPage = container.querySelector('.Delivery');
    expect(deliveryPage).toBeTruthy();
});
