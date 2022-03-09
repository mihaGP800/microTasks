import React, {ChangeEvent, useState} from 'react';

type EditSpanType = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

export const EditSpan: React.FC<EditSpanType> = ({...props}) => {

    let [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onDoubleClickHandler = () => {
        setEdit(true)
    }

    const onBlurHandler = () => {
        setEdit(false)
        props.callBack(newTitle)

    }

    return (
        edit ? <input value={newTitle} onBlur={onBlurHandler} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
    );
}