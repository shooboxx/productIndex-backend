const searchRepo = require("./searchRepo");


const businessFuzzySearch = async (searchCriteria: string) => {
    if (!searchCriteria) throw Error("Business name is required");
    try {
      return await searchRepo.businessSearch(
        searchCriteria.trim().toLocaleUpperCase()
      );
    } catch (e) {
      throw e;
    }
  };

const productFuzzySearch = async (searchCriteria: string, product_type: string) => {
    if (!searchCriteria) throw Error("Business name is required");
    try {
      return await searchRepo.productSearch(
        searchCriteria.trim().toLocaleUpperCase(), product_type
      );
    } catch (e) {
      throw e;
    }
  };

module.exports = {
  businessFuzzySearch,
  productFuzzySearch
};