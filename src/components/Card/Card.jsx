import React, {useEffect, useState} from "react";
import styles from './Card.module.css'


export const Card = ({validationHandler, isLogin}) => {
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

    const action = (e) => {

    validationHandler(form)
    }
    useEffect(() => {
        setForm(data[+isLogin])
    }, [isLogin]);

    const changeHandler = event => {

        setForm({...form, [event.target.name]: event.target.value})
    }
    return (

        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        {isLogin
                            ?
                            <div>
                                <div className="input-field">
                                    <input placeholder="Email" id="email" name="email" type="text" value={form.email}
                                           onChange={changeHandler}/>

                                </div>
                                <div className="input-field">
                                    <input placeholder="Password" id="password" name="password" type="password" value={form.password}
                                           onChange={changeHandler}/>

                                </div>
                            </div>
                            :
                            <div>
                                <div className="input-field">
                                    <input placeholder="Name" id="name" name="name" type="text" value={form.name}
                                           onChange={changeHandler}/>

                                </div>
                                <div className="input-field">
                                    <input placeholder="Surname" id="surname" name="surname" type="text" value={form.surname}
                                           onChange={changeHandler}/>

                                </div>
                                <div className="input-field">
                                    <input placeholder="Email" id="email" name="email" type="text" value={form.email}
                                           onChange={changeHandler}/>

                                </div>
                                <div className="input-field">
                                    <input placeholder="Password" id="password" name="password" type="password" value={form.password}
                                           onChange={changeHandler}/>

                                </div>
                            </div>

                        }
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4"
                                style={{marginRight: 10}}
                                onClick={action} //disabled={loading}
                        >{isLogin ? "Войти" : "Регистрация"}</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
