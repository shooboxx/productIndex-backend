'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
    `
    create table "public".reported_reviews (review_id int4 not null, reported_by int4 not null, reported_reason varchar(255), insert_date timestamp not null, update_date timestamp);
    create table store_contact (id serial not null, business_store_id int4 not null, email text, phone varchar(255), phone_2 varchar(255), phone_3 varchar(255), facebook_url varchar(255), twitter_url varchar(255), instagram_url varchar(255), business_website varchar(255), insert_date date not null, update_date date, primary key (id));
    ALTER TABLE product ADD COLUMN deleted_date date;
    ALTER TABLE business_store ADD COLUMN deleted_date date;
    ALTER TABLE business DROP COLUMN profile_banner_url;
    ALTER TABLE review RENAME COLUMN inappropriate_flag TO flagged_inappropriate;
    ALTER TABLE review RENAME COLUMN flag_reason TO flagged_reason;
    alter table "public".reported_reviews add constraint FKreported_r222003 foreign key (review_id) references "public".review (id);
    alter table store_contact add constraint FKstore_cont40037 foreign key (business_store_id) references "public".business_store (id);
    ALTER TABLE business_store DROP COLUMN email;
    ALTER TABLE business_store DROP COLUMN phone;
    ALTER TABLE business_store DROP COLUMN phone_2;
    ALTER TABLE business_store DROP COLUMN phone_3;
    ALTER TABLE business_store_hours ALTER COLUMN monday_open TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN monday_closed TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN tuesday_open TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN tuesday_closed TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN wednesday_open TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN wednesday_closed TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN thursday_open TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN thursday_closed TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN friday_open TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN friday_closed TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN saturday_open TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN saturday_closed TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN sunday_open TYPE VARCHAR(100);
    ALTER TABLE business_store_hours ALTER COLUMN sunday_closed TYPE VARCHAR(100);
    `
    )},

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
    `
    alter table "public".reported_reviews drop constraint FKreported_r222003;
    alter table store_contact drop constraint FKstore_cont40037;
    drop table if exists reported_reviews cascade;
    drop table if exists store_contact cascade;
    ALTER TABLE product DROP COLUMN deleted_date;
    ALTER TABLE business_store DROP COLUMN deleted_date;
    ALTER TABLE business ADD COLUMN profile_banner_url text;
    ALTER TABLE review RENAME COLUMN flagged_inappropriate TO inappropriate_flag;
    ALTER TABLE review RENAME COLUMN flagged_reason TO flag_reason;
    ALTER TABLE business_store ADD COLUMN email text;
    ALTER TABLE business_store ADD COLUMN phone varchar(255);
    ALTER TABLE business_store ADD COLUMN phone_2 varchar(255);
    ALTER TABLE business_store ADD COLUMN phone_3 varchar(255);

    `
    )}
};
