"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    create table "public".business (Id serial not null, business_name varchar(255) not null, description text, email text not null, profile_banner_url text, profile_pic_url text, active bool not null, category varchar(100), insert_date timestamp not null, update_date timestamp not null, primary key (Id));
    create table "public".business_portfolio (id serial not null, businessId int4 not null, media_url text, media_type varchar(255), title varchar(255), description text, insert_date timestamp, update_date timestamp, primary key (id));
    create table "public".business_role (id serial not null, business_id int4 not null, permissions_id int4 not null, name varchar(255) not null, insert_date timestamp not null, update_date timestamp not null, primary key (id));
    create table "public".business_store (id serial not null, business_id int4 not null, unique_name varchar(255) not null unique, email text, phone varchar(255), phone_2 varchar(255), phone_3 varchar(255), address_line_1 varchar(255), address_line_2 varchar(255), latitude float4, longitude float4, country varchar(255), city varchar(255), postal_code varchar(255), is_primary bool, temp_or_perm_closure char(4), reopen_date date, insert_date timestamp not null, update_date timestamp not null, primary key (id));
    create table "public".business_store_hours (Id serial not null, business_store_id int4 not null, monday_open varchar(255), monday_closed varchar(255), tuesday_open varchar(255), tuesday_closed varchar(255), wednesday_open varchar(255), wednedsay_closed varchar(255), thursday_open varchar(255), thursday_closed varchar(255), friday_open varchar(255), friday_closed varchar(255), saturday_open varchar(255), saturday_closed varchar(255), sunday_open varchar(255), sunday_closed varchar(255), insert_date timestamp not null, update_date timestamp not null, primary key (Id));
    create table "public".permission (id serial not null, products_read bool not null, products_write bool, reviews_read bool, reviews_write bool, stores_read bool, stores_write bool, inventory_read bool, inventory_write bool, insert_date timestamp not null, update_date timestamp not null, primary key (id));
    create table "public".product (id serial not null, business_id int4 not null, product_name varchar(255) not null, product_type varchar(255), image_url text, insert_date timestamp not null, update_date timestamp not null, primary key (id));
    create table "public.business_item" (id serial not null, product_id int4 not null, business_id int4 not null, product_key int4 not null, description int4, "tag" text, insert_date timestamp, update_date timestamp, primary key (id));
    create table "public.inventory_item" (id serial not null, business_item_id int4 not null, business_store_id int4 not null, price int4, quantity int4, insert_date timestamp, update_date timestamp, primary key (id));
    create table "public".review (id serial not null, user_id int4 not null, businessId int4 not null, store_id int4 not null, rating_number int4 not null, comment text not null, inappropriate_flag bool, flag_reason varchar(255), deleted_date timestamp, insert_date timestamp not null, update_date timestamp, primary key (id));
    create table "public".single_sign_on (id serial not null, name varchar(255) not null, description varchar(255), insert_date timestamp not null, update_date timestamp not null, primary key (id));
    create table "public".single_sign_on_user_link (id serial not null, single_sign_onid int4 not null, usersid int4 not null, sso_token varchar(255) not null, insert_date timestamp not null, update_date timestamp not null, primary key (id));
    create table "public".user_business_role (id serial not null, user_id int4 not null, business_role_id int4 not null, insert_date timestamp not null, update_date timestamp not null, primary key (id));
    create table "public".user_tokens (id serial not null, user_id int4 not null, refresh_token text not null, insert_date timestamp not null, update_date timestamp not null, primary key (id));
    create table "public".users (id serial not null, system_role_id int4, email_address text, password varchar(100), first_name varchar(50) not null, last_name varchar(50), date_of_birth date, gender varchar(255), country varchar(255), city varchar(255), address varchar(255), profile_pic_url text, active bool, is_verified bool, verify_token text, verify_expires date, verify_changes text, reset_token text, reset_expires date, primary_phone_contact varchar(255), deleted_date date, insert_date timestamp not null, update_date timestamp not null, primary key (id));
    alter table "public".review add constraint FKreview377146 foreign key (store_id) references "public".business_store (id);
    alter table "public.business_item" add constraint "FKpublic.bus325448" foreign key (business_id) references "public".business (Id);
    alter table "public".user_business_role add constraint FKuser_busin670551 foreign key (business_role_id) references "public".business_role (id);
    alter table "public".business_role add constraint FKbusiness_r802551 foreign key (permissions_id) references "public".permission (id);
    alter table "public.inventory_item" add constraint "FKpublic.inv291690" foreign key (business_item_id) references "public.business_item" (id);
    alter table "public.business_item" add constraint "FKpublic.bus192435" foreign key (product_id) references "public".product (id);
    alter table "public".business_store_hours add constraint FKbusiness_s954772 foreign key (business_store_id) references "public".business_store (id);
    alter table "public".business_role add constraint FKbusiness_r425550 foreign key (business_id) references "public".business (Id);
    alter table "public".product add constraint FKproduct67907 foreign key (business_id) references "public".business (Id);
    alter table "public".review add constraint FKreview86893 foreign key (businessId) references "public".business (Id);
    alter table "public".user_tokens add constraint FKuser_token786593 foreign key (user_id) references "public".users (id);
    alter table "public.inventory_item" add constraint "FKpublic.inv732732" foreign key (business_store_id) references "public".business_store (id);
    alter table "public".single_sign_on_user_link add constraint FKsingle_sig486425 foreign key (usersid) references "public".users (id);
    alter table "public".single_sign_on_user_link add constraint FKsingle_sig118188 foreign key (single_sign_onid) references "public".single_sign_on (id);
    alter table "public".business_portfolio add constraint FKbusiness_p146485 foreign key (businessId) references "public".business (Id);
    alter table "public".business_store add constraint FKbusiness_s784049 foreign key (business_id) references "public".business (Id);
    alter table "public".user_business_role add constraint FKuser_busin352826 foreign key (user_id) references "public".users (id);
    alter table "public".review add constraint FKreview900863 foreign key (user_id) references "public".users (id);
    
    `);
  },

  down: async () => {
    return;
  },
};
