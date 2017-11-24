import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import '../css/bootstrap.min.css'
import { Button, Panel, Grid, Row, Col, Well, Badge } from 'react-bootstrap'
import formatTimestamp from '../util/formatTimestamp'
import CommentCount from './CommentCount'
import * as actions from '../actions/postActions'

class Posts extends Component {

  state = {updated:''}

  componentDidMount () {
    this.getPosts()
  }

  componentDidUpdate (prevProps) {

    if ((prevProps.match.params !== this.props.match.params) || (this.state.updated==='yes')){
      this.getPosts()
      this.setState({updated:'no'})
    }

  }

  getPosts = () => {
    const {category} = this.props.match.params
    if (category != null) {
      this.props.getPostsByCategoryFromServer(category)
    } else {
      this.props.getPostsFromServer()
    }
  }

  sortPost = (e) => {
     e.preventDefault();
     var orderByParam =  e.target.value.split(',');
     this.props.sortPosts(orderByParam[0],orderByParam[1]);
   }
  navigate = post => {
    this.props.history.push(`/${post.category}/${post.id}`)
  }

  deletePost= post =>{
    this.props.deletePostOnServer(post.id);
  }



  render () {
     return (
      <div>
        <h4>Number of posts {this.props.posts.length}
          { this.props.posts.length > 0 ?
            (<select onChange={this.sortPost} >
                 <option value="title,asc">Title A-Z</option>
                 <option value="title,desc">Title Z-A</option>
                 <option value="timestamp,asc">Date Oldest to New</option>
                 <option value="timestamp,desc">Date New to Oldest</option>
                 <option value="voteScore,asc">Score Low to High</option>
                 <option value="voteScore,desc">Score High to Low</option>
            </select>
          ):null
        }
        </h4>
        <div className="panel panel-default">
        {this.props.posts.map(post => (
          <Panel key={post.id} header={post.title} >
          <Grid>
            <Row className="show-grid">
              <Col xs={2} md={2}><Button bsStyle="primary" onClick={() => this.navigate(post)}>Edit Post</Button></Col>
              <Col xs={8} md={7}><Well>{post.body}</Well></Col>
              <Col xs={2} md={2}><Button bsStyle="danger" onClick={() => this.deletePost(post)}>Delete Post</Button></Col>
            </Row>
            <Row className="show-grid">
              <Col xs={2} md={2}>Posted by: {post.author}</Col>
              <Col xs={2} md={2}>Date: {formatTimestamp(post.timestamp)}</Col>
              <Col xs={2} md={2}>Category: <Link to={post.category}>{post.category}</Link></Col>
              <Col xs={1} md={3}>Score <Badge>{post.voteScore}</Badge>  <Button onClick={() => {this.props.votePostOnServer(post.id,'upVote'); this.setState({updated:'yes'})}}>Up Vote</Button>
                <Button onClick={() => {this.props.votePostOnServer(post.id, 'downVote');this.setState({updated:'yes'})}}> Down Vote</Button></Col>
              <Col xs={3} md={2}><CommentCount postId={post.id}/></Col>
            </Row>
          </Grid>
          </Panel>
          )
        )}
          </div>
       </div>
    )
  }
}
const mapStateToProps = ({categories, posts,post}) => ({categories, posts,post})

export default withRouter(connect(mapStateToProps,actions)(Posts))
