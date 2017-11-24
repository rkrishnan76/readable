import * as ACTIONS from '../actions/actionNames'

const comment = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.GET_COMMENT:
    case ACTIONS.ADD_COMMENT:
    case ACTIONS.EDIT_COMMENT:
    case ACTIONS.DELETE_COMMENT:
    case ACTIONS.VOTE_COMMENT:
      return action.comment
    default:
      return state
  }
}

export default comment
