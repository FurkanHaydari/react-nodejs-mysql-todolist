const model = require("../models");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        let createdObject = {
            username: req.body.username,
            password: req.body.password,
        };
        if (!(createdObject.username && createdObject.password)) {
            res.status(400).send({
                status: "fail",
                msg: "Lütfen kullanıcı adı ve şifrenizi giriniz.",
            });
        }
        let isUserExists = await model.findOne("user", {
            username: createdObject.username,
        });

        if (isUserExists) {
            if (
                createdObject.username == isUserExists.username &&
                createdObject.password == isUserExists.password
            ) {
                const token = jwt.sign(
                    {
                        user_id: isUserExists.ID,
                    },
                    process.env.USER_TOKEN_KEY,
                    {
                        expiresIn: "48h",
                    }
                );
                res.status(200).send({
                    status: 200,
                    msg: "Giriş işlemi başarılı",
                    token: token,
                });
            } else {
                res.status(400).send({
                    status: "fail",
                    msg: "Kullanıcı adı veya şifre yanlış.",
                });
            }
        } else {
            res.status(404).send({
                status: "fail",
                msg: "Bu kullanıcı ismine kayıtlı hesap yok.",
            });
        }
    } catch (err) {
        console.log("error in login", err);
        res.status(403).send({ status: "error", msg: err });
        throw err;
    }
};

exports.myTodos = async (req, res) => {
    try {
        const user_id = extractToken(req);
        if (!user_id) {
            res.status(401).send("Unauthorized");
            return;
        }
        let response = await model.getUserTodos("todos", user_id);
        res.send(response);
    } catch (err) {
        console.log(err);
    }
};

exports.createTodo = async (req, res) => {
    try {
        const userID = extractToken(req);
        if (!userID) {
            res.status(401).send("Unauthorized");
            return;
        }
        let todo = {
            todoName: req.body.todoName,
            todoTag: req.body.todoTag || "",
            todoFilePath: req.body.todoFilePath || "",
        };
        let response = await model.create("todos", {
            ...todo,
            user_id: userID,
        });
        res.send(response);
    } catch (err) {
        console.log(err);
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const todoID = req.params.id;
        const userID = extractToken(req);
        if (!userID) {
            res.status(401).send("Unauthorized");
            return;
        }
        const todo = await model.select("todos", { todo_ID: todoID });

        // Check if the todo item exists
        if (!todo) {
            res.status(400).send("This todo item does not exist.");
            return;
        }

        // Check if the todo item belongs to the user
        if (todo.user_id !== userID) {
            res.status(401).send("Unauthorized");
            return;
        }

        let newTodo = {
            todoName: req.body.todoName || "",
            todoTag: req.body.todoTag || null,
            todoFilePath: req.body.todoFilePath || null,
        };
        let response = await model.update(
            "todos",
            { todo_ID: todoID },
            newTodo
        );
        res.send({ response });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        todoID = req.params.id;
        const userID = extractToken(req);
        if (!userID) {
            res.status(401).send("Unauthorized");
            return;
        }

        const todo = await model.select("todos", { todo_ID: todoID });
        // Check if the todo item exists
        if (!todo) {
            res.status(400).send("This todo item does not exist.");
            return;
        }

        // Check if the todo item belongs to the user
        if (todo.user_id !== userID) {
            res.status(401).send("Unauthorized");
            return;
        }

        // Delete the todo item
        let response = await model.delete("todos", { todo_ID: todoID });
        res.send({ response });
    } catch (err) {
        console.log(err);
    }
};

function extractToken(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.USER_TOKEN_KEY);
        const userID = decodedToken.user_id;
        return userID ? userID : null;
    }
    return null;
}
