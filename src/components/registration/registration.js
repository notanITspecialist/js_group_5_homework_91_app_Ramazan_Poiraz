import React, {useState} from 'react';
import {Button, Col, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../actions/user";
import Toast from "light-toast";

const Registration = props => {
    const initLoginForm = {
        username: '',
        password: ''
    };
    const [loginForm, setLoginForm] = useState(initLoginForm);
    const dispatch = useDispatch();

    const user = useSelector(state => state.authorization);

    const registerUserOnSubmit = async e => {
        e.preventDefault();

        if(loginForm.username.length < 5) return Toast.fail('Имя пользователя должно содержать больше 5 символов!',2000);
        if(loginForm.password.length < 5) return Toast.fail('Пароль должен содержать больше 5 символов!',2000);

        await dispatch(registerUser(loginForm,props.history));
    };

    const changeLoginForm = e => setLoginForm({...loginForm, [e.target.name]: e.target.value});
    return (
        <Form style={{margin: '0 20%'}} onSubmit={registerUserOnSubmit}>
            <h2>Registration</h2>
            <FormGroup row>
                <Label sm={2} for="username">Username</Label>
                <Col sm={10}>
                    <Input valid={user.errorReg === true} invalid={!!user.errorReg} type="text" name="username" id="username" placeholder="Username" value={loginForm.username} onChange={changeLoginForm} />
                    <FormFeedback invalid={`true`}>Such username already exists</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2} for="password">Password</Label>
                <Col sm={10}>
                    <Input type="password" name="password" id="password" placeholder="Password" value={loginForm.password} onChange={changeLoginForm} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col >
                    <Button>Submit</Button>
                </Col>
            </FormGroup>
        </Form>
    );
};

export default Registration;