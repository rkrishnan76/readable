 import comment from './comment'
 import comments from './comments'
import categories from './categories'
import post from './post'
import posts from './posts'
import { combineReducers } from 'redux'

export default combineReducers({
  categories, posts, comments, comment, post
})
