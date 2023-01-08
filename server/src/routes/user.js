const userControllers = require("../controllers/user");

const routes = [
    {
        method: "POST",
        path: "/login",
        handler: userControllers.login,
    },
    {
        method: "GET",
        path: "/mytodos",
        handler: userControllers.myTodos,
    },
    {
        method: "PUT",
        path: "/mytodos/update/:id",
        handler: userControllers.updateTodo,
    },
    {
        method: "POST",
        path: "/mytodos/create",
        handler: userControllers.createTodo,
    },
    {
        method: "DELETE",
        path: "/mytodos/delete/:id",
        handler: userControllers.deleteTodo,
    },
];

module.exports = routes;
