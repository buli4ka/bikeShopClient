import React, {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import {Modal} from "../Modal/Modal";
import styles from './NavBar.module.css'
import {AuthForm} from "../AuthForm/AuthForm";
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/useHttp";
import {server} from "../../config";
import {useDispatch, useSelector} from "react-redux";
import {itemsSelector} from "../../store/reducers/cart/cartReducer";
import {addItemToCart} from "../../store/reducers/cart/action";

export const Navbar = () => {
    const [modal, setModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true)
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const dispatch = useDispatch();
    const items = useSelector(itemsSelector)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()

    }
    const validationHandler = async (form) => {
        try {
            let action = server.serverDomain;
            isLogin ? action += server.user.login : action += server.user.registration

            const data = await request(action, 'POST', {...form})
            auth.login(data.token, data.userId, data.userRole)
            const cart = await request(
                server.serverDomain + server.cart.getItems + data.userId
                , 'GET'
                , null)
            cart.forEach(b=>dispatch(addItemToCart(b.id)))


        } catch (e) {
        }
    }

    return (
        <nav className={styles.nav}>
            <div>
                <NavLink className={styles.navLink} style={{float: "left"}}
                         to={require('../../config').client.mainUrl}>Logo</NavLink>

                {!auth.isAuthenticated &&
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
                {auth.isAuthenticated &&
                <>

                    <NavLink to={require('../../config').client.mainUrl} className={styles.navLink}
                             onClick={logoutHandler}>Logout</NavLink>
                    <NavLink className={styles.navLink} to={require('../../config').client.cartUrl}>Cart</NavLink>


                </>}
                {auth.userRole === 'admin' &&
                <NavLink className={styles.navLink} to={require('../../config').client.adminUrl}>Admin</NavLink>}
            </div>

        </nav>)


}
