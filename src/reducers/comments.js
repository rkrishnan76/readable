import * as ACTIONS from '../actions/actionNames'
import {orderBy} from 'lodash'

const comments = (state = [] , action) => {
  switch(action.type) {
    case ACTIONS.GET_COMMENTS:
     return orderBy(action.comments,function(comment) { return comment.voteScore} , ['desc'])
    default:
      return state
  }
}

export default comments
