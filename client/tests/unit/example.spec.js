import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
//import ProductService from '@core/ProductService.js'


describe('Home.vue', () => {
  it('should render products in products', async () => {
    const expected = 0;
    const wrapper = shallowMount(Home);

    const products = wrapper.findAll('ul > li').length;
    expect(products).toBe(expected);
  })
});

it('adding product to cart', async () => {
  const Method = jest.spyOn(Home.methods, "addProductToCart");
  const wrapper = shallowMount(Home);
  await wrapper.find('button.buy__Button')
});

/*it('should fetch from the api', () => {
  const spy = jest.spyOn(ProductService.methods, "init");
  shallowMount(Home)
  expect(spy).toBeCalled();
});*/

it(' should show products in the cart', () => {
  const wrapper = shallowMount(Home, {
    data() {
      return {
        products: [
          {
            id: 1,
            name: '',
            image: '',
            price: 500
          }
        ]
      }
    }
  })
  const product = wrapper.findAll('li').length;
  expect(product).toBe(1);
})




  