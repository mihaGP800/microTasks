import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddEtemInput} from "./Components/AddEtemInput";

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    // let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        // {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        // [todolistID2]: [
        //     {id: v1(), title: "HTML&CSS2", isDone: true},
        //     {id: v1(), title: "JS2", isDone: true},
        //     {id: v1(), title: "ReactJS2", isDone: false},
        //     {id: v1(), title: "Rest API2", isDone: false},
        //     {id: v1(), title: "GraphQL2", isDone: false},
        // ]
    });


    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
    }

    function addTask(todolistID: string, title: string) {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el));
    }

    const removeTodoList = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
    }


    const addTodoList = (newTitle: string) => {
        const newID = v1()
        setTodolists([{id: newID, title: newTitle, filter: 'all'}, ...todolists])
        setTasks({[newID]: [], ...tasks})
    }

    const editSpan = (todolistID: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }

    const editTodoList = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }

    return (
        <div className="App">
            <AddEtemInput callBack={addTodoList}/>
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }

                return <Todolist key={el.id}
                                 todolistID={el.id}
                                 title={el.title}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 removeTodoList={removeTodoList}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={el.filter}
                                 editSpan={editSpan}
                                 editTodoList={editTodoList}
                />
            })}
        </div>
    );
}

export default App;
