import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import { Form, TabContent, TabPane, Nav, NavItem, NavLink, Input, Button, Label, FormGroup, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import LogHabits from '../components/LogHabits';
import ViewHerstory from '../components/ViewHerstory';
import UserProfile from '../components/UserProfile';

const UserHome = (props) => {
    const {id} = props;
    const [activeTab, setActiveTab] = useState('1');
    

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const logout = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/logout', {
        }, {withCredentials: true})
        .then(response => {
            console.log(response.data);
            navigate('/');
        })
        .catch(error => console.log(error));
        };

    return (
        <div >
            <Nav className="bg-info clearfix">
            <NavLink className="float-right" onClick={logout}>Logout</NavLink>
            </Nav>
            <Nav tabs>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}
                    >
                    Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                    >
                    Log Habits for Today
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => { toggle('3'); }}
                    >
                    Herstory
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <UserProfile id = {id} />
                </TabPane>
                <TabPane tabId="2">
                    <LogHabits  />
                </TabPane>
                <TabPane tabId="3">
                    <ViewHerstory />
                </TabPane>
            </TabContent>
            
        </div>
    )
};
    

export default UserHome;