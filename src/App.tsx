import Form from "./components/Form";
import { useReducer,useEffect, useMemo } from "react";
import { ActivityReducer, initialState } from "./reducers/activityReducer";
import List from "./components/List";
import CalorieTracker from "./components/CalorieTracker";


const App = () => {

  const [ state, dispatch ] = useReducer(ActivityReducer, initialState)

  useEffect(() => {
      localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const resetApp = useMemo(() => state.activities.length, [state.activities])

  return(
    <>
      <header className="bg-green-700 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center font-bold text-lg text-white uppercase">Satan laughs as you enternally rot</h1>
          <button className="bg-slate-800 hover:bg-slate-900 p-2 font-bold rounded-md text-white cursor-pointer text-sm disabled:opacity-10"
          disabled={!resetApp}
          onClick={() => dispatch({ type: 'reset'})}>
            Reiniciar App
          </button>
        </div>
      </header>
      <section className="bg-slate-800 py-20 px5">
          <div className="max-w-4xl  mx-auto">
            <Form 
            dispatch={ dispatch }
            state={ state } />
          </div>
      </section>

      <section className="bg-green-700 py-10">
          <div className="max-w-4xl mx-auto"> 
            <CalorieTracker activities={state.activities} /> 
          </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <List 
        state={ state.activities } 
        dispatch={ dispatch }/>
      </section>
    </>
  )
}

export default App;