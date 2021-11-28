'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    `
    create table "public".user_tokens (id serial not null, user_id int4 not null, refresh_token text not null, insert_date timestamp not null, primary key (id));
    alter table "public".user_tokens add constraint FKuser_token786593 foreign key (user_id) references "public".users (id);
    `
  },

  down: async (queryInterface, Sequelize) => {
    `
    alter table "public".user_tokens drop constraint FKuser_token786593;
    drop table if exists "public".user_tokens cascade;

    `
  }
};
