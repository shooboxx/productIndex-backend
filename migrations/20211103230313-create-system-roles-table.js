'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
    `
    create table "public.system_role" (id serial not null, role_name varchar(100) not null, access_level int4 not null, insert_date timestamp not null, update_date timestamp, primary key (id));
    
    INSERT INTO "public".system_role (id, role_name, access_level, insert_date) values (1, 'UNLIMITED', '1', current_timestamp);
    INSERT INTO "public".system_role (id, role_name, access_level, insert_date) values (2, 'SYSTEM_ADMIN', '2', current_timestamp);
    INSERT INTO "public".system_role (id, role_name, access_level, insert_date) values (3, 'MODERATOR', '3', current_timestamp);
    INSERT INTO "public".system_role (id, role_name, access_level, insert_date) values (4, 'TESTER', '3', current_timestamp);
    INSERT INTO "public".system_role (id, role_name, access_level, insert_date) values (5, 'BETA_USER', '4', current_timestamp);
    INSERT INTO "public".system_role (id, role_name, access_level, insert_date) values (6, 'USER', '5', current_timestamp);
    INSERT INTO "public".system_role (id, role_name, access_level, insert_date) values (7, 'ANONYMOUS', '6', current_timestamp);

    commit;
    `
    )
  },

  down: async (queryInterface, Sequelize) => {
    return;
  }
};
