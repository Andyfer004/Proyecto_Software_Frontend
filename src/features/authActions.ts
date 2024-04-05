import { Dispatch } from 'redux';
import api from '../api';
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from './authTypes';



export const login = (credentials: { email: string; password: string }) => async (dispatch: Dispatch) => {
    try {
      const response = await api.post('/login', credentials);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      // Guardar token en almacenamiento local o manejar como prefieras
    } catch (error) {
      console.error(error);
      // Manejar error
    }
};