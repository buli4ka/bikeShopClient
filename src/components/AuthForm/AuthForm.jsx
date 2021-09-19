import React, {useEffect, useState} from "react";
import {Button} from "../UI/Button/Button";
import {Input} from "../UI/Input/Input";

export const AuthForm = ({validationHandler, isLogin, loading}) => {
    const data = [{
        email: '',
        password: ''
    },
        {
            name: '',
            surname: '',
            email: '',
            password: ''
        }
    ]
    const [form, setForm] = useState(data[0])

    useEffect(() => {
        setForm(data[+isLogin])

    }, [isLogin]);

    const action = (e) => {
        e.preventDefault()
        validationHandler(form)
        setForm(data[0])
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginSample = <>
        <Input name="email" value={form.email} onChange={changeHandler} type="text" placeholder="Email"/>
        <Input name="password" value={form.password} onChange={changeHandler} type="password" placeholder="Password"/>
    </>
    const registrationSample = <>
        <Input name="name" value={form.name} onChange={changeHandler} type="text" placeholder="Name"/>
        <Input name="surname" value={form.surname} onChange={changeHandler} type="text" placeholder="Surname"/>

    </>
    return (
        <form>
            {!isLogin ?
                registrationSample : null}
            {loginSample}
            <Button style={{marginTop:"10vh"}}disabled={loading} onClick={action}>{isLogin ? "Login"
                : "Register"}</Button>
        </form>
    )
}
