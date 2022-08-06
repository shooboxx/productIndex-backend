import db from "../../models";
const { Op } = require("sequelize");

const businessSearch = async (searchCriteria: string, location: string) => {
  const store_location = location.toLocaleUpperCase()
  const businesses = await db.BusinessStore.findAll({
    attributes: {
      include: [
        [
          db.sequelize.literal(`(
            select
              round(avg(review.rating_number),1)
            from
              review as review
            where
              review.store_id = "BusinessStore".id
                )`),
            "avg_star_rating",
        ],
        [
          db.sequelize.literal(`(
            select
              count(review.rating_number)
            from
              review as review
            where
              review.store_id = "BusinessStore".id
                )`),
            "review_count",
        ],
      ],
      where: { city: store_location, temp_or_perm_closure: { [Op.is]: null } },
    },
    include: [
      {
        model: db.StoreHours,
        attributes: { exclude: ["id", "insert_date", "update_date"] },
      },
      {
        model: db.Business,
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
          [Op.and]: [{ deleted_date: { [Op.is]: null } }],
        },
        include: [
          {
            model: db.BusinessTags,
          },
        ]
      }
    ]
  });
  if (!businesses) {
    return null;
  }
  return businesses;
};

const productSearch = async (searchCriteria: string, product_type: string, location: string) => {
  const type = product_type.toLocaleUpperCase()
  const store_location = location.toLocaleUpperCase()
  const businesses = await db.BusinessStore.findAll({
    attributes: {
      include: [
        [
          db.sequelize.literal(`(
            select
              round(avg(review.rating_number),1)
            from
              review as review
            where
              review.store_id = "BusinessStore".id
                )`),
            "avg_star_rating",
        ],
        [
          db.sequelize.literal(`(
            select
              count(review.rating_number)
            from
              review as review
            where
              review.store_id = "BusinessStore".id
                )`),
            "review_count",
        ],
      ],
      where: { city: store_location, temp_or_perm_closure: { [Op.is]: null } },
    },
    include: [
      {
        model: db.StoreHours,
        attributes: { exclude: ["id", "insert_date", "update_date"] },
      },
      {
        model: db.Business,
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
          [Op.and]: [{ deleted_date: { [Op.is]: null } }],
        },
        include: [
          {
            model: db.BusinessTags,
          },
          {
            model: db.Product,
            attributes: [],
            where: { product_type: type },
          },
        ]
      }]
  });
  if (!businesses) {
    return null;
  }
  return businesses;
};

module.exports = {
  businessSearch,
  productSearch,
};
