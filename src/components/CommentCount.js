import React, {Component} from 'react'
import {getServerComments} from '../util/serverApi'

class CommentCount extends Component {

  state = {count:0}

  render () {
    getServerComments(this.props.postId).then((comments) => {this.setState({count:comments.length})})
    return (
     <div>
        Number of Comments {this.state.count}
      </div>
    )
  }
}


export default CommentCount
