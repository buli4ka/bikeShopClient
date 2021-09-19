import React, {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import {Modal} from "../Modal/Modal";
import styles from './NavBar.module.css'
import {AuthForm} from "../AuthForm/AuthForm";
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/useHttp";

export const Navbar = ({isAuthenticated, userRole}) => {
    const [modal, setModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true)
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()

    }
    const validationHandler = async (form) => {
        try {
            let action = require('../../config').server.serverDomain;
            isLogin ? action += require('../../config').server.user.login : action += require('../../config').server.user.registration

            const data = await request(action, 'POST', {...form})
            auth.login(data.token, data.userId, data.userRole)

        } catch (e) {
        }
    }

    return (
        <nav className={styles.nav}>
            <div>
                <NavLink className={styles.navLink} style={{float: "left"}}
                         to={require('../../config').client.mainUrl}>Logo</NavLink>

                {!isAuthenticated &&
                <>
                    <NavLink to={require('../../config').client.mainUrl} className={styles.navLink}
                             onClick={() => {
                                 setModal(true)
                             }}>Login</NavLink>

                    <Modal visible={modal} setVisible={setModal}>
                        <h1 className={styles.loginChoice}
                            onClick={() => setIsLogin(!isLogin)}>{
                            isLogin
                                ?
                                "Login"
                                :
                                "Registration"
                        }</h1>
                        <AuthForm validationHandler={validationHandler} isLogin={isLogin} loading={loading}/>

                    </Modal></>}
                {isAuthenticated &&
                <>

                    <NavLink to={require('../../config').client.mainUrl} className={styles.navLink}
                             onClick={logoutHandler}>Logout</NavLink>
                    <NavLink className={styles.navLink} to={require('../../config').client.cartUrl}>Cart</NavLink>


                </>}
                {userRole === 'admin' &&
                <NavLink className={styles.navLink} to={require('../../config').client.adminUrl}>Admin</NavLink>}
            </div>

        </nav>)


}
