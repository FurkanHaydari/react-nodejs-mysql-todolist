import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [hatali, setHatali] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="flex flex-col bg-white drop-shadow-2xl justify-center items-center">
            <div className="flex flex-col justify-center items-start m-2 p-2 bg-red-200s">
                <h1 className="mx-2 mb-4 font-bold">Login to Todo</h1>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        fetch("http://localhost:3001/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                username: values.username,
                                password: values.password,
                            }),
                        })
                            .then((res) => res.json())
                            .then((out) => {
                                if (out.status === 200) {
                                    // Redirect to Todo
                                    navigate("/mytodos", {
                                        state: { data: out.token },
                                    });
                                } else {
                                    setHatali(true);
                                }
                            });
                    }}
                >
                    <Form className="flex flex-col bg-yellow-200s">
                        <label className="mx-2 " htmlFor="username">
                            Username
                        </label>
                        <Field
                            className="p-2 mx-2 mb-2 border-2"
                            id="username"
                            name="username"
                            placeholder="Jane"
                        />

                        <label className="mx-2" htmlFor="password">
                            Password
                        </label>
                        <Field
                            className="p-2 mx-2 border-2"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Doe"
                        />
                        {hatali ? (
                            <div className="mx-2 text-sm mt-2 text-center text-red-500">
                                kullanici adi veya sifre yanlis
                            </div>
                        ) : null}
                        <button
                            className="p-2 m-2 mt-4 rounded-mds bg-gray-800 text-white"
                            type="submit"
                        >
                            Log in
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default LoginForm;
