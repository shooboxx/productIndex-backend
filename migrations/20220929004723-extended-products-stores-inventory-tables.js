'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE inventory_item DROP COLUMN available;
      ALTER TABLE inventory_item ADD COLUMN discounted_price int4;
      ALTER TABLE inventory_item ADD COLUMN public bool;
      update inventory_item set public = true where public is null;
      ALTER TABLE inventory_item ALTER COLUMN public SET NOT NULL;
      update inventory_item  set show_price = true;
      alter table inventory_item alter column show_price set not null;
      
      ALTER TABLE product DROP COLUMN product_key;
      ALTER TABLE product ADD COLUMN sku varchar(255);
      ALTER TABLE product ADD COLUMN category bool;
      
      ALTER TABLE business_store ADD COLUMN public bool;
      update business_store set public = true where public is null;
      alter table business_store alter column public set not null;
      ALTER TABLE business_store ADD COLUMN private_key varchar(255);
      create unique index business_store_private_key on business_store (private_key);
      `
      )},

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE inventory_item ADD COLUMN available bool;
      ALTER TABLE inventory_item DROP COLUMN discounted_price;
      ALTER TABLE inventory_item DROP COLUMN public;
      
      ALTER TABLE product ADD COLUMN product_key varchar(255);
      ALTER TABLE product DROP COLUMN sku;
      ALTER TABLE product DROP COLUMN category;
      
      ALTER TABLE business_store DROP COLUMN public;
      ALTER TABLE business_store DROP COLUMN private_key;
  
      `
      )}
};
