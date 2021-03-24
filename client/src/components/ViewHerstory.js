import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';


const ViewHerstory = (props) => {
    const {_id} = props;
    const [habitList, setHabitList]= useState([]);
    const [user, setUser] = useState({});

    useEffect(()=> {
        axios.get('http://localhost:8000/api/habit')
        .then((res) => {
            const currentUser = res.data._id;
                setUser(currentUser);
                setHabitList(res.data)})
            .catch(err => console.log(err))
    },[]);

    const deleteEntry = (id) => {
        axios.delete('http://localhost:8000/api/habit/' + _id,{},{withCredentials:true})
            .then((res)=> {
                const deletedEntry = res.data;
                console.log(deletedEntry);
                const filteredHabitArray = habitList.filter((habit) => habit._id !== id)
            })
            .catch((err)=> {
                console.log(err);
            });
    };
    return(
        <div>
            <h1>Here is a log of your days.</h1>
            <table className= "table">
                    <thead className="tableHeader">
                        <tr>
                            <th>Date</th>
                            <th>Summary</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    { user === habitList.user?
                    habitList.map((habit, i) => (
                        <tr key = {i}> 
                            <td> {(new Date(habit.createdAt)).toLocaleDateString("en-us")}
                                <p><button onClick={deleteEntry}>Delete Entry</button></p>
                            </td>
                            <td><p>User: {habit.user}</p>
                                <p>Water: {habit.water} cups</p>
                                <p> Meals: {habit.meal} </p>
                                <p>goals: {habit.goal1}</p> 
                                <p>{habit.goal2}</p> 
                                <p>{habit.goal3}</p> 
                                <p> {habit.exercise}</p>
                            </td>
                            <td> 
                            { habit.rating? 
                                    <div>
                                    <p> {habit.rating} Star Day !</p>
                                    <p> note: {habit.note}</p></div>
                            :null}
                            </td>
                        </tr>    
                    )):null}
                    </tbody>
                </table>
        </div>
    )
};

export default ViewHerstory;