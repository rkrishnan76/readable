import { getServerCategories } from '../util/serverApi'

import * as ACTIONS from './actionNames'



export const getCategoriesFromServer = () => dispatch => (
   getServerCategories().then(categories => dispatch(getCategories(categories))
  )
)

function getCategories (categories) {
  return {
  	type: ACTIONS.GET_CATEGORIES,
  	categories
  }
}
