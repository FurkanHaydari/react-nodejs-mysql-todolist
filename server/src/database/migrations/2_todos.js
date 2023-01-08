exports.up = function (knex) {
    return knex.schema.hasTable("todos").then((exists) => {
        if (!exists) {
            return knex.schema.createTable("todos", function (table) {
                table.increments("todo_ID").primary().unsigned().index();
                table.string("todoName", 50);
                table
                    .integer("user_id")
                    .unsigned()
                    .notNullable()
                    .references("id")
                    .inTable("user")
                    .onDelete("CASCADE");
                table.string("todoTag", 50);
                table.string("todoFilePath", 50);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema
        .hasTable("todos")
        .then(function (exists) {
            if (exists) return knex.schema.dropTable("todos");
        })
        .catch((err) => {
            console.log("todos-migration-error", err);
        })
        .finally(() => {
            knex.destroy();
        });
};
