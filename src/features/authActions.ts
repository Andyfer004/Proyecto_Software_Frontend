import { Dispatch } from 'redux';
import api from '../api';
import { LOGIN_SUCCESS, REGISTER_SUCCESS, UPDATE_ACCOUNT_SUCESS } from './authTypes';



export const login = (credentials: { email: string; password: string }) => async (dispatch: Dispatch) => {
    try {
      const response = await api.post('/login', credentials);
      //dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      // Guardar token en almacenamiento local o manejar como prefieras
      return response.data;
    } catch (error) {
      console.error(error);
      // Manejar error
    }
};

export const register = (credentials: { name: string; lastname: string; email: string; password: string; password_confirmation:string; phone: string }) => async (dispatch: Dispatch) => {
    try {
      const response = await api.post('/register', credentials);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      // Guardar token en almacenamiento local o manejar como prefieras
    } catch (error) {
      console.error(error);
      // Manejar error
    }
};

export const updateAccount = (credentials: { name: string; email: string, password:string,phone:string, id:number }) => async (dispatch: Dispatch) => {
  try {
    const response = await api.post('/users/'+credentials.id, credentials);
    dispatch({ type: UPDATE_ACCOUNT_SUCESS, payload: response.data });
    // Guardar token en almacenamiento local o manejar como prefieras
  } catch (error) {
    console.error(error);
    // Manejar error
  }
};