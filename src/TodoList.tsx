import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import * as stream from "stream";
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
    // const onAllClickHandler = () => {
    //     props.changeFilter("all")
    // }
    //
    // const onActiveClickHandler = () => {
    //     props.changeFilter("active")
    // }
    //
    // const onCompletedClickHandler = () => {
    //     props.changeFilter("completed")
    // }
    const changeFilterHandler = (value: FilterValuesType) => {
      props.changeFilter(value)
    }

    const onClickHandler = (tId: string) => props.removeTask(tId)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            {/*<button onClick={addTask}>+</button>*/}
            <Button name={'+'} callBack={addTask}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        {/*<button onClick={()=>onClickHandler(t.id)}>x</button>*/}
                        <Button name={'x'} callBack={()=>onClickHandler(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
            {/*<button onClick={()=>changeFilterHandler('all')}>All</button>*/}
            {/*<button onClick={()=>changeFilterHandler('active')}>Active</button>*/}
            {/*<button onClick={()=>changeFilterHandler('completed')}>Completed</button>*/}
            <Button name={'All'} callBack={()=>changeFilterHandler('all')}/>
            <Button name={'Completed'} callBack={()=>changeFilterHandler('completed')}/>
            <Button name={'Active'} callBack={()=>changeFilterHandler('active')}/>
        </div>
    </div>
}
