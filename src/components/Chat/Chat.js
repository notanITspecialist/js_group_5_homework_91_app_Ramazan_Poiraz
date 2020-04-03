import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getLastMessages, getOnlineUsers, getPrivateMessage} from "../../actions/chat";
import ReconnectingWebSocket from "reconnecting-websocket";
import {FormGroup, Input, ListGroup, ListGroupItem, Tooltip} from "reactstrap";
import Form from "reactstrap/lib/Form";
import Button from "reactstrap/lib/Button";

const Chat = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authorization.user);
    const onlineUsers = useSelector(state => state.chat.onlineUsers);
    const messages = useSelector(state => state.chat.lastMsg);

    const [message, setMessage] = useState({
        message: '',
        private: ''
    });

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const changeMessage = e => setMessage({...message, message: e.target.value});

    const websoket = useRef({});

    useEffect(() => {
        websoket.current = new ReconnectingWebSocket('ws://localhost:8000/chat?token='+user.token);

        websoket.current.onmessage = m => {
            const data = JSON.parse(m.data);
            if(data.type === 'ONLINE_USERS'){
                dispatch(getOnlineUsers(data.allUsers));
            }

            if(data.type === 'PRIVATE_MSG'){
                dispatch(getPrivateMessage(data.data));
            }

            if(data.type === 'OPEN_CONNECT' || data.type === 'LAST_30_MSG'){
                dispatch(getLastMessages(data.data));
            }
        };
        return () => {
            websoket.current.send(JSON.stringify({type: 'LOG_OUT'}));
            websoket.current.close();
        }
    }, [websoket, user, dispatch]);

    const addMessage = e => {
        e.preventDefault();

        websoket.current.send(JSON.stringify({type: 'ADD_MESSAGE', data: message}));
    };
    const setPrivate = id => setMessage({...message, private: id});

    return (
        <div className='d-flex' style={{height: '500px'}}>
            <ListGroup style={{width: '20%'}}>
                <ListGroupItem className='text-uppercase font-weight-bold'>
                    Online users
                </ListGroupItem>
                {onlineUsers.map(e => (
                    e.user._id === user._id ?
                        <ListGroupItem key={e._id}>
                            <span style={{fontSize: '20px'}}>{e.user.username} <b>is online</b></span>
                        </ListGroupItem>
                        :
                        <ListGroupItem key={e._id} id="TooltipExample" style={{cursor: 'pointer'}} onClick={() => setPrivate(e.user._id)}>
                            <span style={{fontSize: '20px'}}>{e.user.username} <b>is online</b></span>
                            <Tooltip placement="left" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                                Send private message
                            </Tooltip>
                        </ListGroupItem>
                ))}
            </ListGroup>
            <div style={{width: '80%', background: '#f5f6f8'}} className='border rounded'>
                <ListGroup style={{height: '100%', overflowY: 'scroll'}}>
                    {messages.map(e => (
                        <ListGroupItem className='d-flex border-0' key={e._id} style={{background: '#f5f6f8'}}>
                            {e.private && e.author._id === user._id && <p><b className='mr-2'>Private for {e.private.username} </b>{e.text}</p>}
                            {e.private && e.private._id === user._id && <p><b className='mr-2'>Private from {e.author.username} </b>{e.text}</p>}
                            {!e.private && <><b className='mr-2'>{e.author.username} </b> <p className='mr-2'>{e.text}</p></>}
                        </ListGroupItem>
                    ))}
                </ListGroup>
                <Form className='d-flex w-100 ' onSubmit={addMessage}>
                    <FormGroup>
                        <Input required type="text" placeholder="Add message" value={message.message} onChange={changeMessage} />
                    </FormGroup>
                    <FormGroup>
                        <Button>{message.private ? 'Private for ' + message.private : 'Send'}</Button>
                    </FormGroup>
                    {' '}
                    {message.private &&
                        <FormGroup>
                            <Button onClick={() => setMessage({...message, private: ''})}>Off private</Button>
                        </FormGroup>
                    }
                </Form>
            </div>
        </div>
    );
};

export default Chat;