
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux"
const PrivateRoute = ({ component: Component, ...rest }) => {
    const userState = useSelector(state => state.loginReducer)
    const {isAuthenticated} = userState
    return (
        // if its not authenticated redirect to login page
        <Route {...rest} render={props => !isAuthenticated ? (
            <Redirect to='/login' />
        ) : (
                <Component {...props} />
            )} />

    )
}

export default PrivateRoute