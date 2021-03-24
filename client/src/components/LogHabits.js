import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import { Form,  Input, Label, FormGroup} from 'reactstrap';


const LogHabits = (props) => {
    const {id} = props;
    const [water, setWater] = useState('0');
    const [meal, setMeal] = useState('0');
    const [note, setNote] = useState('');
    const [rating, setRating] = useState('1');
    const [exercise, setExercise] = useState('');
    const [goal1, setGoal1] = useState('');
    const [goal2, setGoal2] = useState('');
    const [goal3, setGoal3] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newHabit = {
            water,
            meal,
            note,
            rating,
            exercise,
            goal1,
            goal2,
            goal3
        };
        axios.post('http://localhost:8000/api/habit', 
        newHabit , {withCredentials: true})
            .then(response => {
                console.log(response.data);
                navigate(`/habit/${response.data._id}`)
            })
            .catch(err=> console.log("problem with onSubmit UserHome.js", err))
        };
    return (
        <div className= "contiainer-fluid">
            <Form onSubmit= {onSubmitHandler}>
                <FormGroup>
                    <p> List your top three goals for today:</p>
                    <Label for="goal1">Goal 1:</Label>
                    <Input
                        name= "goal1"
                        value= {goal1}
                        onChange={(e)=> setGoal1(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="goal2">Goal 2:</Label>
                    <Input
                        name= "goal2"
                        value= {goal2}
                        onChange={(e)=> setGoal2(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="goal3">Goal 3:</Label>
                    <Input
                        name= "goal3"
                        value= {goal3}
                        onChange={(e)=> setGoal3(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="water" > Water Intake (cups):</Label>
                    <Input
                        type= "number"
                        name="water"
                        value= {water}
                        onChange={(e)=> setWater(e.target.value)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="meal" > Number of Meals Today:</Label>
                    <Input
                        type= "number"
                        name="meals"
                        value= {meal}
                        onChange={(e)=> setMeal(e.target.value)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="exercise" > Exercise:</Label>
                    <Input
                        type="text"
                        name="exercise"
                        value= {exercise}
                        onChange={(e)=> setExercise(e.target.value)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="note" > Notes for today:</Label>
                    <Input
                        type= "textarea"
                        name="note"
                        value= {note}
                        onChange={(e)=> setNote(e.target.value)}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="rating" > Rate Today from 1-5:</Label>
                    <Input
                        type= "number"
                        name="rating"
                        value= {rating}
                        onChange={(e)=> setRating(e.target.value)}
                        />
                </FormGroup>
                <button className="btn btn-primary" type= "submit"> Set Goals for Today </button>                   
            </Form>
        </div>
    )
};

export default LogHabits;