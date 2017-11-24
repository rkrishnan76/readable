import React, {Component} from 'react'
import {connect} from 'react-redux'
import Posts from './Posts'
//import Controls from './Controls'
import Header from './Header'
import * as actions from '../actions/postActions'
// import '../css/bootstrap.min.css'
import { Grid, Row, Col } from 'react-bootstrap'


class Homepage extends Component {
  componentDidMount () {
    this.getPosts()
  }

  componentDidUpdate (previousProps) {
    if (previousProps.match.params !== this.props.match.params) {
       this.getPosts()
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
  render () {
      return (
  <div>
      <Grid>
       <Row className="show-grid">
       </Row>
       <Col xs={12} xd={12}><Header params={this.props.match.params}/></Col>
       <Row className="show-grid">
          <Col xs={12} xd={12}><Posts /></Col>
        </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts})
export default connect(mapStateToProps, actions)(Homepage)
