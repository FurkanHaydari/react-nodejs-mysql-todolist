exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("user")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("user").insert([
                {
                    username: "furkan",
                    password: "123456",
                },
                {
                    username: "emre",
                    password: "123456",
                },
                {
                    username: "mahmut",
                    password: "123456",
                },
            ]);
        });
};
