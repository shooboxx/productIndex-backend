import db from "../../models";
const { Op } = require("sequelize");

const businessSearch = async (searchCriteria: string) => {
  const businesses = await db.Business.findAll({
    include: [
      {
        model: db.BusinessTags,
      },
      {
        model: db.BusinessStore,
        attributes: [
          [
            db.sequelize.literal(`(
                select
                  floor(avg(review.rating_number)),
                  count(review.rating_number)
                from
                  review as review
                where
                  review.store_id = "BusinessStores".id
                    )`),
            "avg_star_rating",
          ],
          "id",
          "unique_name",
          "country",
          "city",
          "temp_or_perm_closure",
          "address_line_1",
          "address_line_2"
        ],
        where: {
          temp_or_perm_closure: { [Op.is]: null },
        },
        include: [
          {
            model: db.StoreHours,
            attributes: { exclude: ["id", "insert_date", "update_date"] },
          },
        ],
      },
    ],
    where: {
      [Op.or]: [
        {
          business_name: db.sequelize.where(
            db.sequelize.fn("METAPHONE", db.sequelize.col("business_name"), 10),
            Op.like,
            db.sequelize.fn(
              "CONCAT",
              "%",
              db.sequelize.fn("METAPHONE", searchCriteria, 10),
              "%"
            )
          ),
        },
        {
          category: db.sequelize.where(
            db.sequelize.fn("METAPHONE", db.sequelize.col("category"), 10),
            Op.like,
            db.sequelize.fn(
              "CONCAT",
              "%",
              db.sequelize.fn("METAPHONE", searchCriteria, 10),
              "%"
            )
          ),
        },
      ],
      [Op.and]: [{ delete_date: { [Op.is]: null } }],
    },
  });
  if (!businesses) {
    return null;
  }
  return businesses;
}

const productSearch = async (searchCriteria: string, product_type: string) => {
  const businesses = await db.Business.findAll({
    include: [
      {
        model: db.BusinessTags,
      },
      {
        model: db.BusinessStore,
        attributes: [
          [
            db.sequelize.literal(`(
                select
                  floor(avg(review.rating_number))
                from
                  review as review
                where
                  review.store_id = "BusinessStores".id
                    )`),
            "avg_star_rating",
          ],
          "id",
          "unique_name",
          "country",
          "city",
          "temp_or_perm_closure",
        ],
        where: {
          temp_or_perm_closure: { [Op.is]: null },
        },
        include: [
          {
            model: db.StoreHours,
            attributes: { exclude: ["id", "insert_date", "update_date"] },
          },
        ],
      },
      {
        model: db.Product,
        attributes: [],
        where: {product_type: product_type}
      }
    ],
    where: {
      [Op.or]: [
        {
          product_name: db.sequelize.where(
            db.sequelize.fn("METAPHONE", db.sequelize.col("product_name"), 10),
            Op.like,
            db.sequelize.fn(
              "CONCAT",
              "%",
              db.sequelize.fn("METAPHONE", searchCriteria, 10),
              "%"
            )
          ),
        },
        {
          tag: db.sequelize.where(
            db.sequelize.fn("METAPHONE", db.sequelize.col("tag"), 10),
            Op.like,
            db.sequelize.fn(
              "CONCAT",
              "%",
              db.sequelize.fn("METAPHONE", searchCriteria, 10),
              "%"
            )
          ),
        },
      ],
      [Op.and]: [{ delete_date: { [Op.is]: null } }],
    },
  });
  if (!businesses) {
    return null;
  }
  return businesses;
};

module.exports = {
  businessSearch,
  productSearch
};
