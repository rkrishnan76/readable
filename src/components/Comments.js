import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../css/bootstrap.min.css'
import { Button,Panel,Grid,Row,Col} from 'react-bootstrap'
import * as actions from '../actions/commentActions'

class Comments extends Component {
  state = {updated:''}

  loadComment = comment => {
    this.props.history.push(`/comments/${comment.id}`)
  }
  delete = comment => {
      this.props.deleteCommentOnServer(comment.id)
  }

    componentDidUpdate (previousProps) {
      if ((previousProps.params !== this.props.params)|| (this.state.updated==='yes')) {
          this.props.getCommentsFromServer(this.props.post.id)
          this.setState({updated:'no'})
        }
    }




  render () {
     return (
        <div>
        <h3>Number of Comments {this.props.comments.length} </h3>
        <div>
        {this.props.comments.map(comment => (
          <Panel id={comment.id} header={comment.author} >
            <Grid>
              <Row className="show-grid">
                <Col xs={4} md={3}> {comment.body}</Col>
                <Col xs={4} md={2}> Comment Score: {comment.voteScore}</Col>
                <Col xs={4} md={1}><Button bsStyle="primary" onClick={() => this.loadComment(comment)}>Edit </Button></Col>
                <Col xs={4} md={1}><Button bsStyle="primary" onClick={() => this.delete(comment)}>Delete </Button></Col>
              </Row>
              <Row className="show-grid">
              <Col xs={4} md={7}>
              <Button onClick={() => {this.props.voteCommentOnServer(comment.id,'upVote');this.setState({updated:'yes'}) }}>Up Vote</Button>
              <Button onClick={() => {this.props.voteCommentOnServer(comment.id,'downVote');this.setState({updated:'yes'}) }}> Down Vote</Button>
              </Col>
              </Row>
            </Grid>
          </Panel>
        ))}
        </div>
       </div>
    )
  }
}

const mapStateToProps = ({comments,comment,post}) => ({comments,comment,post})

export default withRouter(connect(mapStateToProps,actions)(Comments))
