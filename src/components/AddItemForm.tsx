import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type PropsType = {
    callBack: (value: string) => void
}

export const AddItemForm = memo(({callBack, ...restProps}: PropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        if (title.trim() !== '') {
            callBack(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (event.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div>
            <TextField error={!!error}
                       value={title}
                       label={error ? 'Title is required' : ''}
                       variant="outlined"
                       focused
                       color={error ? 'error' : 'info'}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
            />
            <IconButton color={'info'} onClick={onClickHandler}>
                <AddBox/>
            </IconButton>
        </div>
    )
})