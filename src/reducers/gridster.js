import {APP_NAME} from '../actionTypes'

//Intiation state of gridster module
const initialState = {
  appName:''
}
//Export gridster module reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case APP_NAME:
      return {
        ...state,
        appName: APP_NAME
      }

    default:
      return state
  }
}