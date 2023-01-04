'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE business_store DROP COLUMN country;
      ALTER TABLE business ADD COLUMN registered_country varchar(255);
      update business set registered_country = 'Unknown' where registered_country is null;
      ALTER TABLE business ALTER COLUMN registered_country SET NOT NULL;
      `
      )},

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE business_store ADD COLUMN country;
      update business_store set country = 'Unknown' where country is null;
      alter table business_store alter column country set not null;
      ALTER TABLE business DROP COLUMN registered_country varchar(255);
      `
      )}
};
