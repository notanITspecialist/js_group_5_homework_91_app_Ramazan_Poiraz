export const GET_ONLINE_USERS = 'GET_ONLINE_USERS';
export const GET_LAST_MESSAGES = 'GET_LAST_MESSAGES';
export const GET_PRIVATE_MESSAGE = 'GET_PRIVATE_MESSAGE';

const getOnlineUsersRes = data => ({type: GET_ONLINE_USERS, data});
const getLastMessagesRes = data => ({type: GET_LAST_MESSAGES, data});
export const getPrivateMessage = data => ({type: GET_PRIVATE_MESSAGE, data});

export const getOnlineUsers = data => dispatch => {
  dispatch(getOnlineUsersRes(data))
};

export const getLastMessages = data => dispatch => {
  dispatch(getLastMessagesRes(data))
};