import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    buttonName: string
    callBack: (value: string) => void
}

export const AddItemForm = ({buttonName, callBack, ...restProps}: PropsType) => {
    const [title, setTitle] = useState<string>('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        callBack(title)
        setTitle('')
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            callBack(title)
            setTitle('')
        }
    }

    return (
        <>
            <input type="text" value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>{buttonName}</button>
        </>
    )
}