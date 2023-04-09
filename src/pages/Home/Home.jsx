import { useEffect, useState } from 'react'
import DataForm from '../../components/DataForm/DataForm'
import DataTable from '../../components/DataTable/DataTable'
import Papa from 'papaparse'
import { Link } from 'react-router-dom'
import './home.scss'

const Home = ({ invoiceArray, setInvoiceArray }) => {
  const [data, setData] = useState()

  useEffect(() => {
    const load = () => {
      fetch('./product-database.csv')
        .then((res) => res.text())
        .then((resText) => {
          setData(Papa.parse(resText).data)
        })
    }
    load()
  }, [])
  return (
    <div className='home'>
      <h1>Bill Processing System</h1>
      <DataForm
        invoiceArray={invoiceArray}
        setInvoiceArray={setInvoiceArray}
        data={data}
      />
      <DataTable invoiceArray={invoiceArray} />

      <Link to='/invoice'>
        <button>Generate Invoice</button>
      </Link>
    </div>
  )
}

export default Home
