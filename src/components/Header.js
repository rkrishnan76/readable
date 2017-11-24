import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getCategoriesFromServer} from '../actions'
import { Button, ButtonToolbar} from 'react-bootstrap'


class Header extends Component {
  componentDidMount () {
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

  selectCategory = location => {
    this.props.history.push(location)
  }
  addPost = () => {
    this.props.history.push('/post')
  }


  render () {
    const {categories} = this.props
    return (
      <div>
            <ButtonToolbar>
            <Button key="1" bsSize="large"
                active={this.props.params.category === null}
                onClick={() => this.selectCategory('/')}>Show All</Button>
            {categories.map(category => (
              <Button bsSize="large" key={category.name}
               active={this.props.params.category === category.path}
               onClick={() => this.selectCategory(`/${category.path}`)}>{category.name}</Button>
            ))}
            <Button  bsSize="large" onClick={this.addPost} key="2">Add post</Button>
           </ButtonToolbar>
      </div>
    )
  }
}

const mapStateToProps = ({categories}) => ({categories})
const mapDispatchToProps = {getCategoriesFromServer}


export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Header))
