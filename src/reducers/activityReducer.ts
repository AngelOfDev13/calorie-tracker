import { Formulario } from "../types"

export type ActivityActions = 
    { type: 'save-formulario', payload: { newActivity : Formulario } } | 
    { type: 'set-activeId', payload: { id : Formulario['id'] } } | 
    { type: 'delete', payload: { id : Formulario['id'] } } | 
    { type: 'reset' } 


export type ActivityState = {
    activities : Formulario[],
    activeId: Formulario['id']
}

const localStorageAct = () : Formulario[] => {
    const act = localStorage.getItem('activities')
    return act ? JSON.parse(act) : []
}

export const initialState : ActivityState = {
    activities: localStorageAct(),
    activeId: ''
}

export const ActivityReducer = (
    state: ActivityState = initialState, 
    action: ActivityActions) => {

        if(action.type === 'save-formulario') {
            // este codigo maneja la logica para actualizar el state
            let updatedActivity : Formulario[] = []
            if(state.activeId) { 
                updatedActivity = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )
            } else {
                updatedActivity = [...state.activities, action.payload.newActivity]
            }

            return {
                ...state, 
                activities: updatedActivity,
                activeId: ''
            }
        }

        if(action.type === 'set-activeId') {
            return {
                ...state, 
                activeId: action.payload.id
            }
        }

        if(action.type === 'delete') {
             return {
                ...state,
                activities: state.activities.filter(items => items.id !== action.payload.id)
             }
        }

        if(action.type === 'reset') {
            return {
                activities: [], 
                activeId: ''
            }
        }

        return state

}