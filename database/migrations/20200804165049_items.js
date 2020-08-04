exports.up = function(knex) {
    return knex.schema.createTable('items', (tbl) => {
        tbl.increments('pid').unique().notNullable();
        tbl.integer('uid').notNullable();
        tbl.text('itemInfo');
    });

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('items');
};
