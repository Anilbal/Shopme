import React from 'react'
import { isAuthenticated } from '../api/userApi'
import { Navigate, Outlet} from 'react-router-dom'

const CustomerRoute = () => {


  return (
    <div>
        {
            isAuthenticated() && isAuthenticated().user.role===0?
            <><Outlet/></>
            :<Navigate to={'/login'}/>
        }
    </div>
  )
}

export default CustomerRoute