import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import { Form, FormGroup, Label, Input, Row } from 'reactstrap';


const Login = (props) => {
    const {id} = props;
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [errMessage, setErrMessage] = useState('');

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/login', {
            email: email,
            password: password},
            { withCredentials : true})
        .then(response => {
            // if(response.data.error){
            //     setErrMessage(error.response.data.msg);
            // }else {navigate(`/user/${response.data._id}`)}
            console.log("login data", response.data);
            navigate(`/user/${response.data.userLogged.id}`)
        })
        .catch(error => {
            console.log("problem with login.js",error);
            setErrMessage(error.response.data.msg);
    });
};
    return(
        <div className="container-fluid">
            <Row>
                <h2 className="col bg-info">Login</h2>
                <p>{errMessage? errMessage: ""}</p>
            </Row>
                <Form onSubmit={login}>
                    <FormGroup>
                        <Label for="email">Email:</Label>
                        <Input
                            type= "email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <Input
                            type= "password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </FormGroup>
                <div>
                    <button className="btn btn-primary" type='submit'>Sign In</button>
                </div>
            </Form>
        </div>
    );
};

export default Login;