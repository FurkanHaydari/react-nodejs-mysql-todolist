exports.up = function (knex) {
    return knex.schema.hasTable("user").then((exists) => {
        if (!exists) {
            return knex.schema.createTable("user", function (table) {
                table.increments("ID").primary().unsigned().index();
                table.string("username", 50).notNullable();
                table.string("password", 50).notNullable();
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema
        .hasTable("user")
        .then(function (exists) {
            if (exists) return knex.schema.dropTable("user");
        })
        .catch((err) => {
            console.log("user-migration-error", err);
        })
        .finally(() => {
            knex.destroy();
        });
};
