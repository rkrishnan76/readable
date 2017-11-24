import React, {Component} from 'react'
import {connect} from 'react-redux'
//import {getCommentFromServer, deleteCommentOnServer, voteCommentOnServer} from '../actions/commentActions'
import * as actions from '../actions/commentActions'
import {addServerComment,editServerComment} from '../util/serverApi'
import Uuid from 'uuid-lib'
import Header from './Header'
import { Button,
Grid,
Row,
Col,
PageHeader,
Form,
FormGroup,
ControlLabel,
FormControl,
ButtonGroup,
Panel,
Badge
} from 'react-bootstrap'

class Comment extends Component {

  state = {
    author: '',
    body: '',
    newComment:'',
  }

  componentDidMount () {
    this.getComment()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getComment()
    }
  }

  onSubmit() {
    const {newComment} = this.state
    if('yes'===newComment){
    const comment = {
        id: Uuid.raw(),
        parentId: this.props.post.id,
        author: this.state.author,
        body: this.state.body,
        voteScore:1,
        deleted:false
      }
    addServerComment(comment)
    this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`)
    }
    else{
    const comment = {
        id: this.state.id,
        parentId: this.state.parentId,
        author: this.state.author,
        body: this.state.body,
        voteScore:this.state.voteScore,
        deleted:false
      }
    editServerComment(this.state.id,comment)
    this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`)
   }
  }

  onCancel() {
    this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`)
  }

  onAuthorChange(e) {
    this.setState({ author: e.target.value })
  }

  onBodyChange(e) {
    this.setState({ body: e.target.value })
  }

  getComment = () => {
   const {commentId} = this.props.match.params
   if (commentId != null) {
     this.props.getCommentFromServer(commentId).then(data => {

       this.setState( {
           id: data.comment.id,
           parentId: data.comment.parentId,
           body: data.comment.body,
           author: data.comment.author,
           voteScore: data.comment.voteScore,
           newComment:'no'
       })

     })

   }
   else{
     this.setState( {newComment:'yes'})
   }
  }

  deleteComment = () => {
    this.props.deleteCommentOnServer(this.state.id).then(() =>  this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`))
  }

  onUpdate() {

    const comment = {
        id: this.state.id,
        parentId: this.state.parentId,
        author: this.state.author,
        body: this.state.body,
        voteScore:this.state.voteScore,
        deleted:false
      }
    editServerComment(this.state.id,comment)
    this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`)
  }

  render () {

    return (
       <div>

        <Grid>
                   <Header params={this.props.match.params}/>
          <Row className="show-grid">
          <Col xs={12} md={12}><PageHeader>Add/Edit Comment</PageHeader></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={8} md={8}>

              <Form>
                <FormGroup>
                  <ControlLabel>Author</ControlLabel>
                  <FormControl type="text" placeholder="Enter your name ..."
                    value={this.state.author} onChange={(e) => this.onAuthorChange(e)}
                  />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Insert your Text here ...</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Enter your comments here..."
                               value={this.state.body} onChange={(e) => this.onBodyChange(e)}/>
                </FormGroup>


              </Form>
              { this.state.newComment==='no' ?
              (<Panel header="Voting">
                Score <Badge>{this.state.voteScore}</Badge>
                <Button onClick={() => {this.props.voteCommentOnServer(this.state.id,'upVote'); const d=this.state.voteScore +1 ;this.setState({voteScore:d})}}>Up Vote</Button>
                <Button onClick={() => {this.props.voteCommentOnServer(this.state.id,'downVote'); const d=this.state.voteScore -1 ;this.setState({voteScore:d})}}> Down Vote</Button>
              </Panel>) : null
             }
              <ButtonGroup>
                <Button bsStyle="primary" onClick={this.onSubmit.bind(this)}>Submit</Button>
                <Button bsStyle="success" onClick={this.onCancel.bind(this)}>Cancel</Button>
                { this.state.newComment==='no' ?
                (<Button bsStyle="danger" onClick={this.deleteComment} >Delete Comment</Button>):null
                }
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </div>

    )
  }
}

const mapStateToProps = ({post, comment}) => ({post, comment})
//const mapDispatchToProps = {getCommentFromServer, deleteCommentOnServer, voteCommentOnServer}
export default connect(mapStateToProps, actions)(Comment);

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))
