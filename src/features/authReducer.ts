import { LOGIN_SUCCESS, REGISTER_SUCCESS, UPDATE_ACCOUNT_SUCESS } from './authTypes';

const initialState = {
  user: null,
  // Otros estados iniciales relacionados con la autenticación
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    
    case UPDATE_ACCOUNT_SUCESS:
        return {
          ...state,
          user: action.payload,
        };
    // Manejar otros casos
    default:
      return state;
  }
};

export default authReducer;