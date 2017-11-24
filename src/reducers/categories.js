import * as ACTIONS from '../actions/actionNames'

const categories = (state = [] , action) => {
  switch(action.type) {
    case ACTIONS.GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default categories
