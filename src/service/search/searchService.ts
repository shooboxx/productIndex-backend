const searchRepo = require("./searchRepo");


const businessFuzzySearch = async (businessName: string) => {
    if (!businessName) throw Error("Business name is required");
    try {
      return await searchRepo.businessSearch(
        businessName.trim().toLocaleUpperCase()
      );
    } catch (e) {
      throw e;
    }
  };

const productFuzzySearch = async (businessName: string) => {
    if (!businessName) throw Error("Business name is required");
    try {
      return await searchRepo.productSearch(
        businessName.trim().toLocaleUpperCase()
      );
    } catch (e) {
      throw e;
    }
  };

module.exports = {
  businessFuzzySearch,
  productFuzzySearch
};