import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import Todolist from "../components/Todolist";

const Todo = (props) => {
    const location = useLocation();
    const Token = location.state?.data;
    const [todolist, setTodolist] = useState([]);
    const url = "http://localhost:3001/mytodos";
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            })
                // .then((response) => )
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then((response) => {
                            setTodolist(response.todos);
                        });
                    } else if (response.status === 401) {
                        //Redirect to login
                        navigate("/login");
                    }
                });
        }

        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center bg-salute-600 w-screen h-screen">
            <Todolist data={todolist} token={Token} />
        </div>
    );
};

export default Todo;
