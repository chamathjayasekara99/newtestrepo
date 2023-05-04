import { findProducts } from '../dao/product.dao';

//add product to product collection
export const queryAllProducts = async (sellerId) => {
    return await findProducts(sellerId);
}
 //add product to product collection
export const addProduct = async (data) => {
    return await insertProduct(data);
}