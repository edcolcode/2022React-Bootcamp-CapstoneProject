export const pathParams = Object.freeze({
    product: 'productId',
});

export const queriesParams = Object.freeze({
    category: 'category',
    search: 'q',
});

const products = '/products';
const product = `/product/:${pathParams.product}`;
const search = `/search`;

export const navigationPaths = Object.freeze({
    home: '/',
    home2: '/home',
    product: product,
    products: products,
    search: search,
});