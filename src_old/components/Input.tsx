import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type inputType = {
    callBack: (newTitle: string) => void,
}
const Input = (props: inputType) => {
    let [title, setTitle] = useState('')
    const onChangeHandler =(event: ChangeEvent<HTMLInputElement>)=> {
        setTitle(event.currentTarget.value)
    }
    const onClickHandler = () => {
        props.callBack(title)
        setTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div>
            <input value={title} onChange={onChangeHandler}  onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};

export default Input;
//!!!The note!!!! rsc+tab - if you want to create full code 'input' with import react, you can use this command for fast typing




