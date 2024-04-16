import categories from "../data/categories";
import { Dispatch, useState, useEffect } from "react";
import { Formulario } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";
import { v4 as uuidv4 } from 'uuid';

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const Form = ({ dispatch, state } : FormProps) => {

    const [ formulario, setFormulario ] = useState<Formulario>({
        category: 0,
        activity: '',
        calories: 0,
        id: ''

    })

    useEffect(() => {
        if(state.activeId) {
            const selectedActivity = state.activities.filter((stateActivity) => stateActivity.id === state.activeId )[0]
            setFormulario(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {

        const isNumber = ['category', 'calories'].includes(e.target.id)

        setFormulario({
            ...formulario,
            [e.target.id]: isNumber ? +e.target.value : e.target.value,
            id: uuidv4()
        })
    }

    const isValid = () => {
        const { activity, calories } = formulario
        return activity.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({ type : 'save-formulario', payload: { newActivity: formulario}})
        setFormulario({
            category: 0,
            activity: '',
            calories: 0,
            id: ''
        })  

    }
    
    return (
        <form 
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={ handleSubmit }>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="category" className="font-semibold">Categoria:</label>
                    <select
                        id="category"
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white outline-none"
                        value={ formulario.category }
                        onChange={ handleChange }
                    >   
                    <option hidden value="">---Categorias---</option>
                        {categories.map( category => (
                            <option 
                            key={ category.id }
                            value={ category.id }>
                                { category.name }
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-3">
                     <label htmlFor="activity" className="font-semibold">Actividad:</label>
                     <input 
                     className="border border-slate-300 rounded-lg p-2 outline-none"
                     placeholder="Ej. Comida: Pizza, Ejercicio: Pajas."
                     id="activity"
                     type="text"
                     value={ formulario.activity }
                     onChange={ handleChange } />
                </div>

                <div className="grid grid-cols-1 gap-3">
                     <label htmlFor="calories" className="font-semibold">Calorias:</label>
                     <input 
                     className="border border-slate-300 rounded-lg p-2 outline-none"
                     placeholder="Ej. 300, 400."
                     id="calories"
                     type="number" 
                     value={ formulario.calories }
                     onChange={ handleChange }/>
                     
                </div>

                <input 
                    type="submit" 
                    className="bg-black hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:cursor-not-allowed rounded-lg disabled:opacity-10"
                    value={ formulario.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio' }
                    disabled={ !isValid() }
                 />
        </form>
    )
}

export default Form;