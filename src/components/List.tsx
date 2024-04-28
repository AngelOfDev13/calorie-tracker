import { Formulario } from "../types"
import categories from "../data/categories"
import { useMemo } from "react"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useActivity } from "../hooks/useActivity"


const List = () => {

    const { state, dispatch } = useActivity()

    const categoryName = useMemo(() => (category: Formulario['category']) => categories.map(items => items.id === category ? items.name : ''), [state] )

    return(
        <>
        {state.activities.length < 1 ? 
        <h2 className="text-4xl font-bold text-slate-600 text-center">
             Sin Actividades
        </h2>
        : 
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Comida y Actividades
            </h2> }
            
            { state.activities.map(items => (
                <div 
                key={items.id}
                className="px-5 py-10 bg-white mt-5 flex justify-between shadow-md">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-lg shadow-md ${items.category === 1 ? 'bg-green-700' : 'bg-orange-500'}`}> 
                        {categoryName(+items.category)}
                        </p>
                        <p className="text-2xl font-bold pt-5">{items.activity}</p>
                        <p className="font-black text-4xl text-green-700">
                            { items.calories }
                            <span> Calorias</span>
                        </p>

                    </div>

                    <div className="flex gap-5 items-center">
                        <button onClick={() => dispatch({ type: 'set-activeId', payload: {id: items.id} })}>
                            <PencilSquareIcon className="h-8 w-8 text-gray-800"/>
                        </button>

                        <button onClick={() => dispatch({ type: 'delete', payload: {id: items.id} })}>
                            <XCircleIcon className="h-8 w-8 text-red-500" />
                        </button>
                    </div>
                </div>
            )) }
        </>
    )
}

export default List