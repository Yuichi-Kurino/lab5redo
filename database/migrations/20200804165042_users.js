
exports.up = function(knex) {
    return knex.schema.createTable('users', (tbl) => {
        tbl.increments('uid').unique().notNullable();
        tbl.text('email').notNullable();
        tbl.text('password');
    });

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
