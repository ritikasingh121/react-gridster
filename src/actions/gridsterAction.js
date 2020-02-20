import {APP_NAME} from '../actionTypes'

// Export gridster module actions	
export const appName = () => {
  return dispatch => {
    dispatch({
      type: APP_NAME
    })
  }
}