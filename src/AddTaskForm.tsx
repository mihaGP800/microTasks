import React, {ChangeEvent, useState} from 'react';

export const AddTaskForm = (props: any) => {
    let [title, setTitle] = useState('')

    console.log(title)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <div>
            <input onChange={onChangeInputHandler}/>
            <button onClick={() => {}}>+</button>
        </div>
    );
};
