import './dataForm.scss'
import React, { useContext, useState } from 'react'
import { InvoiceContext } from '../../context/InvoiceContext'

const DataForm = ({ data, invoiceArray, setInvoiceArray }) => {
  const { dispatch } = useContext(InvoiceContext)
  //const [invoiceArray, setInvoiceArray] = useState([])

  // console.log(invoiceArray)
  const [billData, setBillData] = useState({
    invoiceNo: '',
    product: '',
    date: '',
    name: '',
    address: '',
    mobile: '',
    gstin: '',
    qty: '',
    hsn: '',
    uom: '',
    discount: '',
    taxable: '',
    rate: '',
  })

  const handleInput = (e) => {
    e.preventDefault()

    let value = e.target.value
    const name = e.target.name

    if (name === 'product') {
      let p = []
      for (let i = 0; i < data.length; i++) {
        if (data[i][0] === value) {
          for (let j = 0; j < data[i].length; j++) {
            p.push(data[i][j])
          }
        }
      }

      setBillData((prev) => ({
        ...prev,
        [name]: value,
        hsn: parseInt(p[1]),
        uom: p[2],
        rate: parseInt(p[3]),
        cgst: parseInt(p[4]),
        sgst: parseInt(p[5]),
      }))
    }

    if (
      name === 'discount' ||
      name === 'gstin' ||
      name === 'invoiceNo' ||
      name === 'qty' ||
      name === 'mobile'
    ) {
      value = parseInt(value)
    }
    setBillData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    setInvoiceArray(invoiceArray.concat(billData))
    //dispatch(add(invoiceArray))
  }

  return (
    <div className='form'>
      <div className='wrapper'>
        <div className='formInputItem'>
          <span>Invoice Number</span>
          <input
            type='number'
            placeholder='enter invoice number'
            onChange={handleInput}
            name='invoiceNo'
          />
        </div>
        <div className='formInputItem'>
          <span>Date</span>
          <input
            type='text'
            placeholder='enter invoice Date'
            onChange={handleInput}
            name='date'
          />
        </div>

        <div className='formInputItem'>
          <span>Customer name</span>
          <input
            type='text'
            placeholder='enter customer name'
            onChange={handleInput}
            name='name'
          />
        </div>
        <div className='formInputItem'>
          <span>Customer Address</span>
          <input
            type='text'
            placeholder='enter address'
            onChange={handleInput}
            name='address'
          />
        </div>
        <div className='formInputItem'>
          <span>Customer Mobile no</span>
          <input
            type='number'
            placeholder='enter customer mobile no '
            onChange={handleInput}
            name='mobile'
          />
        </div>
        <div className='formInputItem'>
          <span>GSTIN</span>
          <input
            type='text'
            placeholder='enter GSTIN'
            onChange={handleInput}
            name='gstin'
          />
        </div>

        <div className='formInputItem'>
          <span>Product Name</span>
          <select
            name='product'
            id=''
            onChange={handleInput}
            className='inputOption'
          >
            {data?.map((item, index) => (
              <option name='product' value={item[0]}>
                {item[0]}
              </option>
            ))}
          </select>
        </div>

        <div className='formInputItem'>
          <span>Product QTY</span>
          <input
            type='number'
            placeholder='enter product qty'
            onChange={handleInput}
            name='qty'
          />
        </div>
        <div className='formInputItem'>
          <span>Discount</span>
          <input
            type='number'
            placeholder='enter discount'
            onChange={handleInput}
            name='discount'
          />
        </div>
      </div>
      <button onClick={handleSubmit}> Submit</button>
    </div>
  )
}

export default DataForm
