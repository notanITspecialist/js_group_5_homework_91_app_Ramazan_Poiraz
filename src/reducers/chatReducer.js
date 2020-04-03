import {GET_LAST_MESSAGES, GET_ONLINE_USERS, GET_PRIVATE_MESSAGE} from "../actions/chat";

const initState = {
  lastMsg: [],
  onlineUsers: []
};

const chatReducer = (state = initState, action) => {
  if(action.type === GET_ONLINE_USERS) {
    return {...state, onlineUsers: action.data};
  }

  if(action.type === GET_ONLINE_USERS) {
    return {...state, onlineUsers: action.data};
  }

  if(action.type === GET_PRIVATE_MESSAGE){
    return {...state, lastMsg: [action.data, ...state.lastMsg]}
  }

  if(action.type === GET_LAST_MESSAGES) return {...state, lastMsg: action.data};
  return state;
};

export default chatReducer;