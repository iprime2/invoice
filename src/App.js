import './App.scss'
import Home from './pages/Home/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Invoice from './pages/Invoice/Invoice'
import { useState } from 'react'

function App() {
  const [invoiceArray, setInvoiceArray] = useState([])

  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <Home
              invoiceArray={invoiceArray}
              setInvoiceArray={setInvoiceArray}
            />
          }
        />
        <Route
          path='/invoice'
          element={
            <Invoice
              invoiceArray={invoiceArray}
              setInvoiceArray={setInvoiceArray}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
