import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPostFromServer,votePostOnServer,deletePostOnServer} from '../actions/postActions'
import {getCommentsFromServer} from '../actions/commentActions'
import {getCategoriesFromServer} from '../actions'
import Comments from './Comments'
import DeletedPost from './DeletedPost'
import {addServerPost,editServerPost} from '../util/serverApi'
import Uuid from 'uuid-lib'
import Header from './Header'
import {   Panel,
  Badge ,
  Button,
  ButtonGroup,
  Row,
  Col,
  Grid,
  PageHeader,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  } from 'react-bootstrap'


class Post extends Component {

  state = {
    title: '',
    category: 'react',
    author: '',
    body: '',
    newPost:'',
    deleted:'',
    id:'',
    deletedPost:'no'
  }

  componentDidMount () {
    const {postId} = this.props.match.params
    if(postId!==null) {
      this.getPost()
      this.setState( {newPost:'yes'})
    }
    this.getCategories()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.params !== this.props.params) {
      this.getCategories()
    }
  }

  getCategories = () => {
    this.props.getCategoriesFromServer()
  }

  getPost = () => {
    const {postId} = this.props.match.params
    if (postId != null) {
      this.props.getPostFromServer(postId).then(data => {
        (data!=null ? (
        this.setState( {
          id: data.post.id,
          timestamp: data.post.timestamp,
          title: data.post.title,
          body: data.post.body,
          author: data.post.author,
          category: data.post.category,
          voteScore: data.post.voteScore,
          deleted: data.post.deleted,
          newPost:'no'
        })): this.deletedPost())
      })

      this.props.getCommentsFromServer(postId)
    }
    else{
      this.props.getCommentsFromServer(null)
    }
  }

  deletedPost = () => {
    this.setState({deletedPost:'yes'})
  }

  deletePost = () => {
    this.props.deletePostOnServer(this.state.id).then(() => this.props.history.push('/'))
  }




  onSubmit(){
    const {newPost} = this.state
    if('yes'===newPost){
      const newPost = {
          id: Uuid.raw(),
          timestamp: Date.now(),
          title: this.state.title,
          category: this.state.category,
          author: this.state.author,
          body: this.state.body,
          voteScore:1,
          deleted:false
        }
      addServerPost(newPost)
    }
    else {
      const newPost = {
          id: this.state.id,
          timestamp: this.state.timestamp,
          title: this.state.title,
          category: this.state.category,
          author: this.state.author,
          body: this.state.body,
          voteScore:this.state.voteScore,
          deleted:false
        }
      editServerPost(this.state.id,newPost)
    }
          this.props.history.push('/')
  }

  onCancel() {

    this.props.history.push('/')
  }


  onTitleChange(e) {
    this.setState({ title: e.target.value })
  }

  onAuthorChange(e) {
    this.setState({ author: e.target.value })
  }

  onBodyChange(e) {
    this.setState({ body: e.target.value })
  }

  onCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    })
  }

  newComment = () => {
     this.props.history.push('/comment')
  }
  render () {
    const optionList = this.props.categories.map(category => ( <option key={category.name} value={category.name}>{category.name}</option> ) )
     if(this.state.deletedPost==='yes'){
        return(<DeletedPost/>)
      }
   else{
    return (
      <div>
        <Grid>
        <Header params={this.props.match.params}/>
          <Row className="show-grid">
          <Col xs={12} md={12}><PageHeader>Add/Edit Post</PageHeader></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={4} md={4}>
              <Form>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl type="text" placeholder="Enter title here..."
                    value={this.state.title} onChange={(e) => this.onTitleChange(e)}
                  />

                </FormGroup>
                </Form>
                </Col>

                <Col xs={4} md={4}>
                <Form>
                <FormGroup>
                  <ControlLabel>Select Category</ControlLabel>
                  <FormControl componentClass="select" placeholder="select"
                               value={this.state.category} onChange={this.onCategoryChange}>
                      {optionList}
                  </FormControl>
                </FormGroup>
                </Form>
                </Col>
                </Row>
                <Row className="show-grid">
              <Col xs={8} md={8}>
              <Form>
                <FormGroup>
                  <ControlLabel>Post your Text here ...</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Enter your post here..."
                               value={this.state.body} onChange={(e) => this.onBodyChange(e)}/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Author</ControlLabel>
                  <FormControl type="text" placeholder="Enter your name here ..."
                    value={this.state.author} onChange={(e) => this.onAuthorChange(e)}
                  />
                </FormGroup>
              </Form>
              { this.state.newPost==='no' ?
              (<Panel header="Voting">
                Score <Badge>{this.state.voteScore}</Badge>
                <Button onClick={() => {this.props.votePostOnServer(this.state.id,'upVote'); const d=this.state.voteScore +1 ;this.setState({voteScore:d})}}>Up Vote</Button>
                <Button onClick={() => {this.props.votePostOnServer(this.state.id, 'downVote'); const d=this.state.voteScore -1 ;this.setState({voteScore:d})}}> Down Vote</Button>
              </Panel>): null}

              <ButtonGroup>
                <Button bsStyle="primary" onClick={this.onSubmit.bind(this)}>Submit</Button>
                <Button  bsStyle="success" onClick={this.onCancel.bind(this)}>Cancel</Button>
                 { this.state.newPost==='no' ? <Button bsStyle="danger" onClick={this.deletePost} >Delete Post</Button> : null }
                 { this.state.newPost==='no' ? <Button bsStyle="info" onClick={this.newComment}>Add comment</Button> : null }
              </ButtonGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={8} md={8}>
              <Comments />
            </Col>

          </Row>
        </Grid>
      </div>
    )
  }
 }
}

const mapStateToProps = ({post, categories, comments}) => ({post, categories, comments})

export default connect(mapStateToProps, {getPostFromServer, getCategoriesFromServer, getCommentsFromServer,deletePostOnServer,votePostOnServer})(Post)
