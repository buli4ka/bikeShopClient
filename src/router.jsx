import React from 'react'

import {Redirect, Route, Switch} from "react-router-dom";
import {AllBikesPage} from "./pages/AllBikes/AllBikes.page";
import {BikeDetailPage} from "./pages/BikeDetail/BikeDetail.page";
import {AdminPage} from "./pages/Admin/Admin.page";
import {CartPage} from "./pages/Cart/Cart.page";
import {AddManufacturer} from "./pages/Admin/AddManufacturer/AddManufacturer";
import {AddBike} from "./pages/Admin/AddBike/AddBike";

export const useRoutes = (isAuthenticated, userRole) => {

    if (isAuthenticated && userRole === "admin")
        return (
            <Switch>
                <Route path={require("./config").client.adminUrl} exact>
                    <AdminPage/>
                </Route>
                <Route path={require("./config").client.addManufacturerUrl} exact>
                    <AddManufacturer/>
                </Route>
                <Route path={require("./config").client.addBikeUrl} exact>
                    <AddBike/>
                </Route>

                <Route path={require("./config").client.cartUrl} exact>
                    <CartPage/>
                </Route>
                <Route path={require("./config").client.mainUrl} exact>
                    <AllBikesPage/>
                </Route>
                <Route path={require("./config").client.detailUrl} exact>
                    <BikeDetailPage/>
                </Route>
                <Redirect to={require("./config").client.mainUrl}/>

            </Switch>
        )
    if (isAuthenticated && userRole==='user') {
        return (
            <Switch>
                <Route path={require("./config").client.mainUrl} exact>
                    <AllBikesPage/>
                </Route>
                <Route path={require("./config").client.cartUrl} exact>
                    <CartPage/>
                </Route>
                <Route path={require("./config").client.mainUrl} exact>
                    <AllBikesPage/>
                </Route>
                <Route path={require("./config").client.detailUrl} exact>
                    <BikeDetailPage/>
                </Route>
                <Redirect to={require("./config").client.mainUrl}/>
            </Switch>)
    } else {
        return (<Switch>
            <Route path={require("./config").client.mainUrl} exact>
                <AllBikesPage/>
            </Route>
            <Route path={require("./config").client.detailUrl} exact>
                <BikeDetailPage/>
            </Route>
        </Switch>)
    }

}
