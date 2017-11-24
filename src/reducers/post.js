import * as ACTIONS from '../actions/actionNames'

const post = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.GET_POST:
    case ACTIONS.ADD_POST:
    case ACTIONS.EDIT_POST:
    case ACTIONS.DELETE_POST:
    case ACTIONS.VOTE_POST:
      return action.post
    default:
      return state
  }
}

export default post
