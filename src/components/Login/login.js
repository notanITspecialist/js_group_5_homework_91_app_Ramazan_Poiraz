import React, {useState} from 'react';
import {Alert, Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../actions/user";

const Login = props => {
    const initLoginForm = {
        username: '',
        password: ''
    };
    const [loginForm, setLoginForm] = useState(initLoginForm);
    const dispatch = useDispatch();

    const user = useSelector(state => state.authorization);

    const registerUserOnSubmit = async e => {
        e.preventDefault();
        await dispatch(loginUser(loginForm, props.history));
    };

    const changeLoginForm = e => setLoginForm({...loginForm, [e.target.name]: e.target.value});
    return (
        <Form style={{margin: '0 20%'}} onSubmit={registerUserOnSubmit}>
            <h2>Login</h2>
            {user.errorLog && <Alert color='danger'>Username or password is incorrect</Alert>}
            <FormGroup row>
                <Label sm={2} for="username">Username</Label>
                <Col sm={10}>
                    <Input type="text" name="username" id="username" placeholder="Username" value={loginForm.username} onChange={changeLoginForm} />
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

export default Login;