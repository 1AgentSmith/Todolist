import React from 'react';


type PropsType = {
    callBack: () => void,
    value: string,
}

export const Button = (props: PropsType) => {
    const onClickHandler = () => {
         props.callBack()
    }
    return (
        <button onClick={onClickHandler}>{props.value}</button>
    )
}
/*
changeFilter('All')*/
