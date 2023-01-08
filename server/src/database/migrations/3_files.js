exports.up = function (knex) {
    return knex.schema.hasTable("files").then((exists) => {
        if (!exists) {
            return knex.schema.createTable("files", function (table) {
                table.increments("ID").primary().unsigned().index();
                table
                    .integer("todos_id")
                    .unsigned()
                    .notNullable()
                    .references("id")
                    .inTable("todos")
                    .onDelete("CASCADE");
                table.string("path", 50).notNullable();
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema
        .hasTable("files")
        .then(function (exists) {
            if (exists) return knex.schema.dropTable("files");
        })
        .catch((err) => {
            console.log("files-migration-error", err);
        })
        .finally(() => {
            knex.destroy();
        });
};
