import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: false},
    ])


    // const tasks_2: Array<TaskType> = [
    //     {id: 1, title: 'Football', isDone: true},
    //     {id: 2, title: 'CS', isDone: true},
    //     {id: 3, title: 'BF', isDone: true}
    // ]
    // const tasks_3: Array<TaskType> = [
    //     {id: 1, title: 'Gilera', isDone: true},
    //     {id: 2, title: 'Aprilia', isDone: false},
    //     {id: 3, title: 'Bmw', isDone: false}
    // ]
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: number) => {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
        // setTasks([...tasks])
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilterTasksForRender = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone === true)
            case "active":
                return tasks.filter(t => t.isDone === false)
            default:
                return tasks
        }
    }

    const filteredTasksForRender = getFilterTasksForRender()

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={filteredTasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
            {/*<TodoList title={'What to game'} tasks={tasks_2}/>*/}
            {/*<TodoList title={'What to ride'} tasks={tasks_3}/>*/}
        </div>
    );
}

export default App;
