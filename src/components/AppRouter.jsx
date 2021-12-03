import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router";
import { useState } from "react/cjs/react.development";
import AuthContext from "../context";
import Devices from "../pages/Devices";
import Login from "../pages/Login";
import Users from "../pages/Users";
import Post from "../pages/Post";
import Gallery from "../pages/Gallery";
import Loader from "react-loader-spinner";

const AppRouter = () => {
    const {isAuth,isLoading}=useContext(AuthContext)
    console.log(isAuth);
    if(isLoading){
        return <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    }
    return (
        isAuth?
        <Switch>
            <Route path="/users" component={Users} />
            <Route path="/devices" component={Devices} />
            <Route path="/post" component={Post} />
            <Route path="/gallery" component={Gallery}/>
            <Redirect to="/devices" />
        </Switch>
        :
        <Switch>
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
        </Switch>
    )

}
export default AppRouter
