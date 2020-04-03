import {LOGIN_USER_ERROR, LOGOUT_USER, REGISTER_USER_ERROR, REGISTER_USER_RES} from "../actions/user";

const initialState = {
    user: {},
    errorReg: false,
    errorLog: false
};

const user = (state = initialState, action) => {
    if(action.type === REGISTER_USER_RES){
        return {...state, user: action.data, errorReg: false};
    }
    if(action.type === REGISTER_USER_ERROR){
        return {...state, errorReg: action.error};
    }

    if(action.type === LOGIN_USER_ERROR){
        return {...state, errorLog: action.error};
    }

    if(action.type === LOGOUT_USER){
        return {...state, user: {}}
    }
    return state;
};

export default user;