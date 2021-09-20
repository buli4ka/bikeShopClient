import React from 'react';
import {BrowserRouter as Router} from "react-router-dom"
import {Navbar} from "./components/NavBar/Navbar";
import {useRoutes} from "./router";
import styles from './App.module.css';
import {useAuth} from "./hooks/useAuth";
import {Preloader} from "./components/UI/Preloader/Preloader";
import { AuthContext } from "./context/authContext";

export default function App() {
    const {token, login, logout, userId, userRole, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated, userRole);

    if (!ready) {
        return <Preloader/>
    }
    return (

        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated,userRole}}>
            <Router>
                <Navbar />
                <div className={styles.container}>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>

    )
}
