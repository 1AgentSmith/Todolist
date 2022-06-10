import {FilterValuesType} from "../App";

export const FilterReducer =(state: FilterValuesType, action: ChangeFilterACType)=> {
    switch (action.type) {
        case "CHANGE-FILTER" : {
            return action.payload.value
        }
        default : return state
    }
}
type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return{
        type: "CHANGE-FILTER",
        payload: {
            value,
            todolistID,
        }
    } as const
}

