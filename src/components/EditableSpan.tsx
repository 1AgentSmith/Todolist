import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: PropsType) => {

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
        editMode ? <input type="text"
                          value={title}
                          onChange={onChangeHandler}
                          onBlur={editModeHandler}
                          autoFocus
                          onKeyPress={onKeyPressHandler}
        /> : <span onDoubleClick={editModeHandler}>{title}</span>
    )

}