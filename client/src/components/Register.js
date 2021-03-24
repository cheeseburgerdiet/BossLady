import React, {useState} from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { navigate } from '@reach/router';


const Register = props => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmReg, setConfirmReg] = useState('');
    const [errs, setErrs] = useState({});

    const register = (e) => {
        e.preventDefault();
        
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        };
        axios.post('http://localhost:8000/api/user/register',
        newUser, {
            withCredentials : true
        })
        .then((res) => {
            console.log(res.data);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrs({});
            setConfirmReg("Thank you for registering, you can now log in!")
        })
        .catch(err => {
            console.log(err);
            setErrs(err.response.data.errors);
        });
    };
    return(
        <div className= "container-fluid">
            <div className="row">
                <h2 className="col bg-primary">Register</h2>
                {confirmReg?
                <h4 style={{color: 'green'}}>{confirmReg}</h4>
                :null
                }
            </div>
            <Form onSubmit={register}>
                <FormGroup>
                    <Label for="firstName">First Name: </Label>
                    <Input
                        name="firstName"
                        value={firstName}
                        onChange = {(e) => setFirstName(e.target.value)}
                    />
                    { errs.firstName?
                        <p style= {{color: "red"}}>{errs.firstName.message}</p>
                        : null
                        }
                </FormGroup>
                <FormGroup>
                    <Label for="firstName">Last Name: </Label>
                    <Input
                        name="lastName"
                        value={lastName}
                        onChange = {(e) => setLastName(e.target.value)}
                    />
                    { errs.lastName?
                        <p style= {{color: "red"}}>{errs.lastName.message}</p>
                        : null
                        }
                </FormGroup>
                <FormGroup>
                    <Label for="email"> Email: </Label>
                    <Input
                        type= "email"
                        name="email"
                        value={email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    { errs.email?
                        <p style= {{color: "red"}}>{errs.email.message}</p>
                        : null
                        }
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password: </Label>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                    { errs.password?
                        <p style= {{color: "red"}}>{errs.password.message}</p>
                        : null
                        }
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password: </Label>
                    <Input
                        type= "password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange = {(e) => setConfirmPassword(e.target.value)}
                    />
                    { errs.confirmPassword?
                        <p style= {{color: "red"}}>{errs.confirmPassword.message}</p>
                        : null
                        }
                </FormGroup>
                <div className="row">
                    <button className="btn btn-primary" type= "submit"> Register Me </button>
                </div>
            </Form>
        </div>
    );
};

export default Register;