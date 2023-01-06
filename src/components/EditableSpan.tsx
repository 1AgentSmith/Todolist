import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {TextField} from "@mui/material";


type PropsType = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = memo((props: PropsType) => {
    console.log('EditableSpan is Called')
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const editModeHandler = () => {
        setEditMode(!editMode)
        props.callBack(title)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            editModeHandler()
        }
    }
    return (
        // id="filled-basic"
        // size={'small'}
        // variant="standard"
        editMode ? <TextField
            value={title}
            onChange={onChangeHandler}
            onBlur={editModeHandler}
            autoFocus
            onKeyDown={onKeyPressHandler}
        /> : <span onDoubleClick={editModeHandler}>{title}</span>
    )

})