import React, { useEffect }  from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { loadUser } from "../Redux/actions/userActions"

const ProtectedRoute = ({children, isAdmin}) => {

    const {isAuthenticated=false , loading=true, user} = useSelector((state) => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {

        if(!user){
            dispatch(loadUser())
        }
    }, [isAuthenticated, loading])

    if (loading) return <></>

    if (loading === false && isAuthenticated){
        if (isAdmin === true && user.role !== "admin"){
            return <Navigate to="/"/>
        }
        return children
    }
    else{
        return <Navigate to={"/login"} />
    }

}




export default ProtectedRoute