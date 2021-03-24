import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const LogReg = () => {
    return (
        <div className= "container-flex">
            <div className="row">
                <div className="col">
                    <Login />
                </div>
                <div className= "col">
                    <Register />
                </div>
            </div>
        </div>
    )
}

export default LogReg;