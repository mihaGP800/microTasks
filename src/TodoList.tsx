import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddEtemInput} from "./Components/AddEtemInput";
import {EditSpan} from "./Components/EditSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    removeTodoList: (todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    editSpan: (todolistID: string, taskId: string, newTitle: string) => void
    editTodoList: (todolistID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todolistID)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistID, newTitle)
    }

    const editSpanHandler = (tID: string, newTitle: string) => {
        props.editSpan(props.todolistID, tID, newTitle)
    }

    const editTodoListHandler = (newTitle: string) => {
        props.editTodoList(props.todolistID, newTitle)
    }

    return <div>
        <h3><EditSpan oldTitle={props.title} callBack={editTodoListHandler}/>
            <button onClick={removeTodoListHandler}>x</button>
        </h3>
        <AddEtemInput callBack={addTaskHandler}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditSpan oldTitle={t.title} callBack={(newTitle) => editSpanHandler(t.id, newTitle)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
