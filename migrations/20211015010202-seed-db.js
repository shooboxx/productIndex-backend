"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
   `
   create table "public".business (Id serial not null, created_by int4 not null, business_name varchar(255) not null, description text, profile_banner_url text, profile_pic_url text, active bool not null, category varchar(100), deleted_date timestamp, insert_date timestamp not null, update_date timestamp, primary key (Id));
   create table "public".business_portfolio (id serial not null, business_id int4 not null, media_url text, media_type varchar(255), title varchar(255), description text, insert_date timestamp, update_date timestamp, primary key (id));
   create table "public".business_store (id serial not null, business_id int4 not null, unique_name varchar(255) not null unique, email text, phone varchar(255), phone_2 varchar(255), phone_3 varchar(255), address_line_1 varchar(255), address_line_2 varchar(255), latitude float4, longitude float4, country varchar(255), city varchar(255), state varchar(255), postal_code varchar(255), is_primary bool, temp_or_perm_closure char(4), reopen_date date, insert_date timestamp not null, update_date timestamp not null, primary key (id));
   create table "public".business_store_hours (Id serial not null, business_store_id int4 not null, monday_open time, monday_closed time, tuesday_open time, tuesday_closed time, wednesday_open time, wednedsay_closed time, thursday_open time, thursday_closed time, friday_open time, friday_closed time, saturday_open time, saturday_closed time, sunday_open time, sunday_closed int4, insert_date timestamp not null, update_date timestamp, primary key (Id));
   create table "public".business_tags (id serial not null, business_id int4 not null, "tag" varchar(255), insert_date timestamp, update_date timestamp, primary key (id));
   create table "public".inventory_item (id serial not null, business_store_id int4 not null, product_id int4 not null, price int4, quantity int4, available bool, show_price bool, insert_date timestamp, update_date timestamp, primary key (id));
   create table "public".product (id serial not null, business_id int4 not null, product_name varchar(255) not null, product_type varchar(255), product_key varchar(255) not null, image_url text, description varchar(255), "tag" text, insert_date timestamp not null, update_date timestamp not null, primary key (id));
   create table "public".review (id serial not null, user_id int4 not null, store_id int4 not null, rating_number int4 not null, comment text not null, inappropriate_flag bool, flag_reason varchar(255), insert_date timestamp not null, update_date timestamp, deleted_date timestamp, primary key (id));
   create table "public".single_sign_on (id serial not null, name varchar(255) not null, description varchar(255), insert_date timestamp not null, update_date timestamp, primary key (id));
   create table "public".single_sign_on_user_link (id serial not null, single_sign_onid int4 not null, user_id int4 not null, sso_token varchar(255) not null, insert_date timestamp not null, update_date timestamp, primary key (id));
   create table "public".system_role (id serial not null, role_name varchar(100) not null, access_level int4 not null, insert_date timestamp not null, update_date timestamp, primary key (id));
   create table "public".user_tokens (id serial not null, user_id int4 not null, refresh_token text not null, insert_date timestamp not null, primary key (id));
   create table "public".users (id serial not null, system_role_id int4 not null, email_address text not null, password varchar(100) not null, first_name varchar(50), last_name varchar(50), date_of_birth date, gender varchar(255), country varchar(255), city varchar(255), state varchar(255), profile_pic_url text, active bool, is_verified bool, verify_token text, verify_expires timestamp, verify_changes timestamp, reset_token text, reset_expires timestamp, primary_phone_contact varchar(255), deleted_date timestamp, insert_date timestamp not null, update_date timestamp, primary key (id));
   alter table "public".inventory_item add constraint FKinventory_88461 foreign key (product_id) references "public".product (id);
   alter table "public".business_tags add constraint FKbusiness_t471537 foreign key (business_id) references "public".business (Id);
   alter table "public".users add constraint FKusers419884 foreign key (system_role_id) references "public".system_role (id);
   alter table "public".review add constraint FKreview377146 foreign key (store_id) references "public".business_store (id);
   alter table "public".business_store_hours add constraint FKbusiness_s954772 foreign key (business_store_id) references "public".business_store (id);
   alter table "public".product add constraint FKproduct67907 foreign key (business_id) references "public".business (Id);
   alter table "public".user_tokens add constraint FKuser_token786593 foreign key (user_id) references "public".users (id);
   alter table "public".inventory_item add constraint FKinventory_833551 foreign key (business_store_id) references "public".business_store (id);
   alter table "public".single_sign_on_user_link add constraint FKsingle_sig505645 foreign key (user_id) references "public".users (id);
   alter table "public".single_sign_on_user_link add constraint FKsingle_sig118188 foreign key (single_sign_onid) references "public".single_sign_on (id);
   alter table "public".business_portfolio add constraint FKbusiness_p3027 foreign key (business_id) references "public".business (Id);
   alter table "public".business_store add constraint FKbusiness_s784049 foreign key (business_id) references "public".business (Id);
   alter table "public".review add constraint FKreview900863 foreign key (user_id) references "public".users (id);
   alter table "public".business add constraint review foreign key (created_by) references "public".users (id);
   
   `);
  },

  down: async () => {
  `
    alter table "public".inventory_item drop constraint FKinventory_88461;
    alter table "public".business_tags drop constraint FKbusiness_t471537;
    alter table "public".users drop constraint FKusers419884;
    alter table "public".review drop constraint FKreview377146;
    alter table "public".business_store_hours drop constraint FKbusiness_s954772;
    alter table "public".product drop constraint FKproduct67907;
    alter table "public".user_tokens drop constraint FKuser_token786593;
    alter table "public".inventory_item drop constraint FKinventory_833551;
    alter table "public".single_sign_on_user_link drop constraint FKsingle_sig505645;
    alter table "public".single_sign_on_user_link drop constraint FKsingle_sig118188;
    alter table "public".business_portfolio drop constraint FKbusiness_p3027;
    alter table "public".business_store drop constraint FKbusiness_s784049;
    alter table "public".review drop constraint FKreview900863;
    alter table "public".business drop constraint review;
    drop table if exists "public".business cascade;
    drop table if exists "public".business_portfolio cascade;
    drop table if exists "public".business_store cascade;
    drop table if exists "public".business_store_hours cascade;
    drop table if exists "public".business_tags cascade;
    drop table if exists "public".inventory_item cascade;
    drop table if exists "public".product cascade;
    drop table if exists "public".review cascade;
    drop table if exists "public".single_sign_on cascade;
    drop table if exists "public".single_sign_on_user_link cascade;
    drop table if exists "public".system_role cascade;
    drop table if exists "public".user_tokens cascade;
    drop table if exists "public".users cascade;

  `
  },
};
