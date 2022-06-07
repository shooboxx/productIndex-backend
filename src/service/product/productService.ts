import { Product } from "./productType";
const productRepo = require("./productRepo");
const businessService = require("../business/businessService");

const getBusinessProducts = (bId: number): Product[] => {
  try {
    businessService.getBusinessById(bId);
    const products: Product[] = productRepo.findProductsByBusinessId(bId);
    if (!products) throw new Error("No products found for this business");
    return products;
  } catch (e) {
    throw e;
  }
};

const getProductById = async (pId: number) => {
  const product: Product = productRepo.findProductById(pId);

  if (!product) {
    throw new Error("No product found with that id");
  }
  return product;
};

const updateProduct = (product: Product) => {
  return;
};

const createProduct = async (product: Product) => {
  try {
    if (!product.product_name) throw new Error("Product name is required");

    const newProduct = await productRepo.createProduct(product);
    return newProduct;
  } catch (e) {
    throw e;
  }
};

const deleteProduct = () => {
  return;
};

module.exports = {
  getBusinessProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
};
