import axios from "axios";
import Toast from "light-toast";
import {push} from 'connected-react-router';

export const REGISTER_USER_RES = 'REGISTER_USER_RES';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const LOGOUT_USER = 'LOGOUT_USER';



export const regUserRes = data => ({type: REGISTER_USER_RES, data});
export const regUserError = error => ({type: REGISTER_USER_ERROR, error});
export const loginUserError = error => ({type: LOGIN_USER_ERROR, error});

export const logoutUserSuc = () => ({type: LOGOUT_USER});



export const registerUser = (register, history) => async dispatch => {
    try {
        const data = await axios.post('http://localhost:8000/user', register);
        if(data.data.error) return  dispatch(regUserError(data.data.error));
        dispatch(regUserRes(data.data));
        Toast.success('Registration success!',500);
        history.push('/')
    } catch (e) {
        Toast.fail('Such username already exists',500);
        dispatch(regUserError(e));
    }
};
export const loginUser = (register, history) => async dispatch => {
    try {
        const data = await axios.post('http://localhost:8000/user/sessions', register);
        if(data.data.error) return  dispatch(loginUserError(data.data.error));
        dispatch(regUserRes(data.data));
        Toast.success('Login success!',500);
        history.push('/')
    } catch (e) {
        Toast.fail('Username or password is incorrect',500);
        dispatch(loginUserError(e));
    }
};

export const logoutUser = () => async (dispatch, getState) => {
    const user = getState().authorization.user;
    const header = {'Authorization': "Token "+user.token};

    await axios.delete('http://localhost:8000/user/sessions', {headers: header});
    dispatch(logoutUserSuc());
    dispatch(push('/login'));
    Toast.success('Logout success!', 500);
};