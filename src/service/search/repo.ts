import db from "../../models";
const { Op } = require("sequelize");

const businessSearch = async (searchCriteria: string, location: string) => { 
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
                  round(avg(review.rating_number),1)
                from
                  review as review
                where
                  review.store_id = "BusinessStores".id
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
                  review.store_id = "BusinessStores".id
                    )`),
            "review_count",
          ],
          "id",
          "unique_name",
          "country",
          "city",
          "temp_or_perm_closure",
          "address_line_1",
          "address_line_2",
        ],
        where: { city: location, temp_or_perm_closure: { [Op.is]: null } },
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
};

module.exports = {
    businessSearch,
  };