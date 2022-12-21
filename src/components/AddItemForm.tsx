import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type PropsType = {
    buttonName: string
    callBack: (value: string) => void
}

export const AddItemForm = ({buttonName, callBack, ...restProps}: PropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    // const titleError = {
    //     color: 'red'
    // }

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
        setError(null);
        if (event.key === 'Enter') {
           onClickHandler()
            setTitle('')
        }
    }

    return (
        <div>
            {/*<input type="text" value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*/>*/}
            <TextField id="outlined-basic"
                       size={'small'}
                       value={title}
                       label={error ? 'Title is required' : ''}
                       variant="outlined"
                       focused
                       color={error ? 'error' : 'info'}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
            />
            <Button size={'small'} variant={'contained'} color={'info'} onClick={onClickHandler}>{buttonName}</Button>
            {/*{error && <div style={titleError}>{error}</div>}*/}
        </div>
    )
}