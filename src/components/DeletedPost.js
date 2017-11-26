import React from 'react'
import { Link } from 'react-router-dom'


const DeletedPost = function(props) {
    return (
      <div>
          <h3>Post Deleted.<Link to='/'>Return to Home page</Link></h3>
      </div>
  )
}

export default DeletedPost
