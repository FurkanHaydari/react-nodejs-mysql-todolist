exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("todos")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("todos").insert([
                {
                    todoName: "yazılım",
                    user_id: 1,
                    todoTag: "iş",
                    todoFilePath: "",
                },
                {
                    todoName: "donanım",
                    user_id: 2,
                    todoTag: "iş",
                    todoFilePath: "",
                },
                {
                    todoName: "yönetici",
                    user_id: 3,
                    todoTag: "iş",
                    todoFilePath: "",
                },
                {
                    todoName: "asistan",
                    user_id: 1,
                    todoTag: "iş",
                    todoFilePath: "",
                },
                {
                    todoName: "çaycı",
                    user_id: 2,
                    todoTag: "iş",
                    todoFilePath: "",
                },
            ]);
        });
};
