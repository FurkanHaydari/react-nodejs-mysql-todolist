import React, { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";

const Todolist = (props) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileSubmit = (event) => {
        event.preventDefault();
        // upload the file to a server
        const formData = new FormData();
        formData.append("file", file);
        // you can use fetch or axios to send the request
    };

    async function editTodo(todoID, todoName, todoTag) {
        const response = await fetch(
            `http://localhost:3001/mytodos/update/${todoID}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify({
                    todoName: todoName,
                    todoTag: todoTag,
                    todoFilePath: "",
                }),
            }
        );
        if (response.status === 200) {
            const responseTodos = await fetch("http://localhost:3001/mytodos", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            });
            if (responseTodos.status === 200) {
                responseTodos.json().then((responseTodos) => {
                    setTodolist(responseTodos.todos);
                });
            }
        }
    }
    async function deleteTodo(todoID) {
        const response = await fetch(
            `http://localhost:3001/mytodos/delete/${todoID}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            }
        );

        if (response.status === 200) {
            const responseTodos = await fetch("http://localhost:3001/mytodos", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            });
            if (responseTodos.status === 200) {
                responseTodos.json().then((responseTodos) => {
                    setTodolist(responseTodos.todos);
                });
            }
        }
    }

    // Set a new todo
    async function AddTodo(todo, tag) {
        const response = await fetch("http://localhost:3001/mytodos/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Token}`,
            },
            body: JSON.stringify({
                todoName: todo,
                todoTag: tag,
                todoFilePath: "",
            }),
        });
        if (response.status === 200) {
            const responseTodos = await fetch("http://localhost:3001/mytodos", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            });
            if (responseTodos.status === 200) {
                responseTodos.json().then((responseTodos) => {
                    setTodolist(responseTodos.todos);
                });
            }
        }
    }

    const [searchValue, setSearchValue] = useState("");
    const [todoValue, setTodoValue] = useState("");
    const [tagValue, setTagValue] = useState("");

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };
    const handleTodo = (event) => {
        setTodoValue(event.target.value);
    };
    const handleTag = (event) => {
        setTagValue(event.target.value);
    };

    const [isTag, setIsTag] = useState(true);
    const Token = props.token;

    const [filteredList, setFilteredList] = useState([]);
    const [todolist, setTodolist] = useState([
        { todoTag: "", todoName: "", todoFilePath: "" },
    ]);
    useEffect(() => {
        async function getData() {
            const responseTodos = await fetch("http://localhost:3001/mytodos", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            }).then((responseTodos) => {
                responseTodos.json().then((responseTodos) => {
                    setTodolist(responseTodos.todos);
                });
            });
        }
        getData();
    }, []);

    useEffect(() => {
        setFilteredList(
            todolist.filter((todoContent) => {
                if (isTag) {
                    return todoContent.todoTag.includes(searchValue);
                } else {
                    return todoContent.todoName.includes(searchValue);
                }
            })
        );
    }, [todolist]);
    return (
        <div className="flex flex-col p-2 bg-white drop-shadow-2xl">
            <h1 className="font-bold m-2 p-2">Todolist</h1>

            <div className="flex">
                {/* <input className='m-2 p-2' placeholder='Search...'/> */}
                <input
                    className="m-2 p-2 w-full border-2"
                    type="text"
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder="Search..."
                />

                <div
                    className="bg-blue-200 p-2 m-2"
                    onClick={() => {
                        setIsTag(true);
                    }}
                    style={isTag ? { background: "rgb(15,255,0)" } : null}
                >
                    tag
                </div>
                <div
                    className="bg-blue-200 p-2 m-2 "
                    onClick={() => {
                        setIsTag(false);
                    }}
                    style={isTag ? null : { background: "rgb(15,255,0)" }}
                >
                    text
                </div>
            </div>
            <div className="flex">
                <input
                    className="m-2 p-2 w-full border-2"
                    type="text"
                    value={todoValue}
                    onChange={handleTodo}
                    placeholder="Add a todo..."
                />
                <input
                    className="m-2 p-2 w-1/4 border-2"
                    type="text"
                    value={tagValue}
                    onChange={handleTag}
                    placeholder="Add a tag..."
                />
                <>
                    <form onSubmit={handleFileSubmit}>
                        <label>
                            <input type="file" onChange={handleFileChange} />
                        </label>
                        <button className="bg-blue-200 p-2 m-2" type="submit">
                            Upload file/img
                        </button>
                    </form>
                </>
                <div
                    className="bg-blue-200 p-2 m-2"
                    onClick={() => {
                        if (todoValue.length !== 0) {
                            AddTodo(todoValue, tagValue);
                        }
                    }}
                >
                    add
                </div>
            </div>

            {todolist.length === 0 ? (
                <Circles
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            ) : (
                filteredList.map((word, index) => {
                    return (
                        <div
                            className="flex justify-between items-center bg-gray-500 p-2 m-2"
                            key={index}
                        >
                            <div className="flex justify-center items-center mx-2">
                                {/* eğer image var ise  */}
                                {word?.img?.length !== 0 ? (
                                    <img
                                        src={require("../files/image.png")}
                                        width={40}
                                    />
                                ) : null}

                                <div className="px-2">{word.todoName}</div>
                                <div className="bg-gray-200 p-2">
                                    {word.todoTag}
                                </div>
                            </div>

                            <div className="flex">
                                {/* eğer dosya var ise */}
                                <div
                                    className="bg-blue-200 mx-2 p-2"
                                    onClick={() => {
                                        //Download of word.img / word.file
                                    }}
                                >
                                    Download File
                                </div>
                                <div
                                    className="bg-blue-200 mx-2 p-2"
                                    onClick={() => {
                                        // editTodo(word.todo_ID)
                                    }}
                                >
                                    Edit Todo
                                </div>
                                <div
                                    className="bg-blue-200 mx-2 p-2"
                                    onClick={() => {
                                        deleteTodo(word.todo_ID);
                                    }}
                                >
                                    Delete Todo
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Todolist;
