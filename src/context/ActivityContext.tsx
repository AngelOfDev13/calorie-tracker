import { ReactNode, createContext, useReducer, Dispatch } from "react";
import { ActivityReducer, initialState } from "../reducers/activityReducer";
import { ActivityState, ActivityActions } from "../reducers/activityReducer";

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
}

export const ActivityContext = createContext<ActivityContextProps>(null!) 

export const ActivityProvider = ({ children  } : ActivityProviderProps) => {

    const [ state, dispatch ] = useReducer(ActivityReducer, initialState)

    return(
        <ActivityContext.Provider 
        value={{
            state, 
            dispatch
        }}>
            { children }
        </ActivityContext.Provider>
    )
}