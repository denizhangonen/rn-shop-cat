import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId
      };
    case LOGOUT :
      return  initialState
    // case LOGIN:
    //   return {
    //     ...state,
    //     token: action.token,
    //     userId: action.userId
    //   };
    // case SIGNUP:
    //   return {
    //     ...state,
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};

export default authReducer;
