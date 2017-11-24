import { getServerPosts,
         getServerPostsByCategory,
         addServerPost,
         getServerPost,
         editServerPost,
         deleteServerPost,
         voteServerPost

 } from '../util/serverApi'

import * as ACTIONS from './actionNames'

export const getPostsFromServer = () => dispatch => (
   getServerPosts().then(posts => dispatch(getPosts(posts))
  )
)

function getPosts (posts) {
  return {
  	type: ACTIONS.GET_POSTS,
  	posts
  }
}

export const getPostsByCategoryFromServer = (category) => dispatch => (
 getServerPostsByCategory(category).then(posts => dispatch(getPostsByCategory(category,posts))
  )
)

function getPostsByCategory (category,posts) {
  return {
  	type: ACTIONS.GET_POSTS_BY_CATEGORY,
  	category,
  	posts
  }
}

export function sortPosts (sortBy,sortOrder) {
  return {type: ACTIONS.SORT_POSTS, sortBy, sortOrder}
}


export const getPostFromServer = (postId) => dispatch => (
   getServerPost(postId).then(post => ( post.deleted===false ? dispatch(getPost(post)) : null )
  )
)


function getPost (post) {
  return {type: ACTIONS.GET_POST, post}
}

export const addPostOnServer = ({post}) => dispatch => (
   addServerPost(post).then(post => dispatch(addPost(post))
  )
)

function addPost (post) {
  return {type: ACTIONS.ADD_POST, post}
}

export const editPostOnServer = (postId,post) => dispatch => (
   editServerPost(postId,post).then(post => dispatch(editPost(post))
  )
)

function editPost (post) {
  return {type: ACTIONS.EDIT_POST, post}
}

export const deletePostOnServer = (postId) => dispatch => (
   deleteServerPost(postId).then(post => dispatch(deletePost(post))
  )
)

function deletePost (post) {
  return {type: ACTIONS.DELETE_POST, post}
}

export const votePostOnServer = (postId,option) => dispatch => (
   voteServerPost(postId,option).then(post => dispatch(votePost(post))
  )
)

function votePost (post) {
  return {type: ACTIONS.VOTE_POST, post}
}


//////////////
