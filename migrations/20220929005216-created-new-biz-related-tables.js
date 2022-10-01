'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `
      create table "public".business_activity (id serial not null, user_id int4 not null, business_id int4 not null, activity varchar(500) not null, previous_value varchar(255), current_value varchar(255), insert_date timestamp, update_date timestamp, primary key (id));
      create table "public".business_access_level (id serial not null, access_level int4 not null, access_name varchar(100) not null unique, insert_date timestamp not null, update_date timestamp, primary key (id));
      create table "public".employee (id serial not null, business_id int4 not null, user_id int4 not null, business_access_level_id int4 not null, insert_date timestamp, update_date timestamp, primary key (id));
      create table "public".employee_assignment (id serial not null, employee_id int4 not null, business_store_id int4 not null, role_id int4 not null, insert_date timestamp, update_date timestamp, primary key (id));
      create table "public".reported_store (id serial not null, store_id int4 not null, reported_by int4 not null, reported_reason varchar(255) not null, insert_date timestamp, update_date timestamp, primary key (id));
      create table "public".role (id serial not null, business_store_id int4 not null, role_name varchar(255) not null, insert_date timestamp, update_date timestamp, primary key (id));
      create table "public".inventory_item_history (id serial not null, inventory_item_id int4 not null, "transaction" varchar(100), reason varchar(100), insert_date timestamp, update_date timestamp, updated_by int4, primary key (id));
      create table "public".order (id serial not null, store_id int4 not null, insert_date timestamp, update_date timestamp, primary key (id));
      create table order_line (id serial not null, order_id int4 not null, inventory_item_id int4 not null, quantity int4 not null, price_per_item int4 not null, update_date timestamp, insert_date timestamp, primary key (id));
      create table "public".payment (id serial not null, order_id int4 not null, payment_type varchar(100) not null, payment_amount int4 not null, payment_status varchar(100) not null, insert_date timestamp, update_date timestamp, primary key (id));      
      alter table "public".employee add constraint FKemployee385934 foreign key (business_access_level_id) references "public".business_access_level (id);
      alter table "public".employee_assignment add constraint FKemployee_a306081 foreign key (role_id) references "public".role (id);
      alter table "public".employee_assignment add constraint FKemployee_a862901 foreign key (employee_id) references "public".employee (id);
      alter table "public".payment add constraint FKpayment633860 foreign key (order_id) references "public".order (id);
      alter table "public".order_line add constraint FKorder_line488074 foreign key (order_id) references "public".order (id);

      `
      )},

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `
      drop table if exists "public".business_activity cascade;
      alter table "public".employee drop constraint FKemployee385934;
      alter table "public".employee_assignment drop constraint FKemployee_a306081;
      alter table "public".employee_assignment drop constraint FKemployee_a862901;
      drop table if exists "public".business_access_level cascade;
      drop table if exists "public".employee cascade;
      drop table if exists "public".employee_assignment cascade;
      drop table if exists "public".reported_store cascade;
      drop table if exists "public".role cascade;
      alter table "public".payment drop constraint FKpayment633860;
      alter table "public".order_line drop constraint FKorder_line488074;
      drop table if exists "public".inventory_item_history cascade;
      drop table if exists "public".order cascade;
      drop table if exists "public".order_line cascade;
      drop table if exists "public".payment cascade;


  
      `
      )}
};
