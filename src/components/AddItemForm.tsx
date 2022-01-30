import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    title: string
    label? : string

}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return <div>
        <TextField id="outlined-basic"
                   label={error ? "Title is required" : props.label}
                   variant="outlined"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
                   size="small"
                   error={error}
        />

        <Button variant="contained" onClick={addItem} style={{maxWidth: '70px', maxHeight: '40px', minWidth:'30px', minHeight:'30px', margin: '0px 0px 0px 5px'}} >{props.title}</Button>

        {error && <div className="error-message">{error}</div>}
    </div>
}
