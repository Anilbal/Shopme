import React from 'react'
import '../pageCss/pagenotfound.css'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className='page-main'>
        <h2>404</h2>
        <h4>error!!!</h4>
        <p>we are sorry, but the page you requested was not found</p>
        <Link to={'/'}><button>go to home page</button></Link>
    </div>
  )
}

export default PageNotFound