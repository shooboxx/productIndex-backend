import db from "../../models";
const { Op } = require("sequelize");

const businessSearch = async (businessName: string) => {
  //TODO: Figure out how to name match (trim and lowercase)
  const searchableName = businessName.toUpperCase().replace(" ", "");
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
    ],
    where: {
      [Op.or]: [
        {
          business_name: db.sequelize.where(
            db.sequelize.fn("METAPHONE", db.sequelize.col("business_name"), 10),
            "like",
            db.sequelize.fn(
              "CONCAT",
              "%",
              db.sequelize.fn("METAPHONE", searchableName, 10),
              "%"
            )
          ),
        },
        {
          category: db.sequelize.where(
            db.sequelize.fn("METAPHONE", db.sequelize.col("category"), 10),
            "like",
            db.sequelize.fn(
              "CONCAT",
              "%",
              db.sequelize.fn("METAPHONE", searchableName, 10),
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
