import db from "../../models";
import { Product } from "./productType";

const findProductById = async (product_id: number) => {
  const product = await db.Product.findByPk(product_id);
  if (!product) {
    return;
  }
  return product.dataValues;
};

const createProduct = async (newProduct: Product) => {
  const product = await db.Product.create({
    product_name: newProduct.product_name,
    product_type: newProduct.product_type,
    product_key: newProduct.product_key,
    image_url: newProduct.image_url,
    business_id: newProduct.business_id,
  }).catch((err) => console.log(err));
  if (!product) {
    return;
  }
  return product.dataValues;
};

const removeProduct = async (product_id: number) => {};
const updateProduct = async (product_id: number, newProduct: any) => {};

const findProductsByBusinessId = async (business_id: number) => {
  const products = await db.Product.findAll({
    where: { business_id: business_id },
  });
  if (!products) {
    return;
  }
  return products.dataValues;
};

module.exports = {
  findProductById,
  createProduct,
  removeProduct,
  updateProduct,
  findProductsByBusinessId,
};
