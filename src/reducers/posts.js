import {orderBy} from 'lodash'
import * as ACTIONS from '../actions/actionNames'

const posts = (state = [] , action) => {
  switch(action.type) {
    case ACTIONS.GET_POSTS:
     return action.posts
    case ACTIONS.GET_POSTS_BY_CATEGORY:
     return action.posts
    case ACTIONS.SORT_POSTS:
      return orderBy([...state], [action.sortBy], [action.sortOrder])
    default:
      return state
  }
}

export default posts
