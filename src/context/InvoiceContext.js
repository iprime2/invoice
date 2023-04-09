import { createContext, useEffect, useReducer } from 'react'
import InvoiceReducer from './InvoiceReducer'

const INITIAL_STATE = {
  data: [JSON.stringify(localStorage.getItem('invoice')) || null],
}

export const InvoiceContext = createContext(INITIAL_STATE)

export const InvoiceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(InvoiceReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem('invoice', JSON.stringify(state.data))
  }, [state.data])

  return (
    <InvoiceContext.Provider value={{ data: state.data, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  )
}
