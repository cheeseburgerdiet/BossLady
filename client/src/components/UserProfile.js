import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, NavLink
    } from 'reactstrap';


const UserProfile = (props) => {
    const {id} = props;
    const [user, setUser] = useState({})

    useEffect(()=> {
        axios.get('http://localhost:8000/api/user/' + id)
        .then((response) => {
            const currentuser = response.data.userLogged;
                console.log(currentuser);
                setUser(currentuser)
            })
            .catch(err => console.log("Problem with UserHome.js" + err));
    }, []);
    

    return(
        <div>
        <Card>
            <CardBody>
            <CardTitle tag="h5">Welcome Back! {user.firstName} {user.LastName} </CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
            <CardText>“The secret of getting ahead is getting started.” – Mark Twain</CardText>
            </CardBody>
        </Card>
        </div>
    );
};
    

export default UserProfile;