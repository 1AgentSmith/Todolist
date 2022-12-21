import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    buttonName: string
    callBack: (value: string) => void
}

export const AddItemForm = ({buttonName, callBack, ...restProps}: PropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const titleError = {
        color: 'red'
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        if (title.trim() !== '') {
            callBack(title)
            setTitle('')
            setError(null)
        } else {
            setTitle('')
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
           onClickHandler()
        }
    }

    return (
        <div>
            <input type="text" value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>{buttonName}</button>
            {error && <div style={titleError}>{error}</div>}
        </div>
    )
}