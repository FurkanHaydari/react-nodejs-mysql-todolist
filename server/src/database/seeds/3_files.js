exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("files")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("files").insert([
                {
                    todo_id: 1,
                    path: "/files/1.txt",
                },
                {
                    todo_id: 2,
                    path: "/files/2.jpg",
                },
                {
                    todo_id: 3,
                    path: "/files/3.mp4",
                },
            ]);
        });
};
