import './dataTable.scss'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'

const DataTable = ({ invoiceArray }) => {
  const rows = invoiceArray && invoiceArray
  const [invoiceData, setInvoiceData] = useState()

  const [taxableFinal, setTaxableFinal] = useState(0)
  const [cgst, setCgst] = useState(0)
  const [sgst, setSgst] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  let tf = 0
  let c = 0
  let s = 0
  let ta = 0

  useEffect(() => {
    setInvoiceData(invoiceArray)
  }, [invoiceArray])

  useEffect(() => {
    setTaxableFinal(taxableFinal + tf)
    setCgst(cgst + c)
    setSgst(sgst + s)
    setTotalAmount(totalAmount + ta)
  }, [invoiceData])

  const ccyFormat = (num) => {
    if (!num) {
      return
    }
    return `${num.toFixed(2)}`
  }

  const priceRow = (qty, unit) => {
    return qty * unit
  }

  const sumDiscount = (items, value) => {
    return items?.map(({ discount }) => discount).reduce((sum, i) => sum + i, 0)
  }

  const taxable = (qty, rate, discount) => {
    tf = qty * rate - discount
    return tf
  }

  const tax = (qty, rate, tax, type) => {
    if (type === 'cgst') {
      c = (qty * rate * tax) / 100
    } else if (type === 'sgst') {
      s = (qty * rate * tax) / 100
    }
    const t = (qty * rate * tax) / 100
    return t
  }

  const finalAmount = (rate, qty, discount, sgst, cgst) => {
    const p = rate * qty
    const t = (p * (sgst + cgst)) / 100
    ta = p - discount - t
    return ta
  }

  const totalDiscount = sumDiscount(rows)

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
          <TableHead>
            <TableRow>
              <TableCell>SR.NO.</TableCell>
              <TableCell align='right'>PRODUCT</TableCell>
              <TableCell align='right'>HSN CODE</TableCell>
              <TableCell align='right'>UOM</TableCell>
              <TableCell align='right'>QTY</TableCell>
              <TableCell align='right'>RATE</TableCell>
              <TableCell align='right'>PRICE</TableCell>
              <TableCell align='right'>DISCOUNT</TableCell>
              <TableCell align='right'>TAXABLE VALUE</TableCell>
              <TableCell align='right'>CGST</TableCell>
              <TableCell align='right'>SGST</TableCell>
              <TableCell align='right'>AMOUNT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell align='left'>{row.product}</TableCell>
                <TableCell align='right'>{row.hsn}</TableCell>
                <TableCell align='right'>{row.uom}</TableCell>
                <TableCell align='right'>{ccyFormat(row.qty)}</TableCell>
                <TableCell align='right'>{ccyFormat(row.rate)}</TableCell>
                <TableCell align='right'>
                  {ccyFormat(priceRow(row.qty, row.rate))}
                </TableCell>
                <TableCell align='right'>{ccyFormat(row.discount)}</TableCell>
                <TableCell align='right'>
                  {ccyFormat(taxable(row.qty, row.rate, row.discount))}
                </TableCell>
                <TableCell align='right' className='tax'>
                  {ccyFormat(tax(row.qty, row.rate, row.cgst, 'cgst'))}
                  <br />
                  {ccyFormat(row.cgst)}%
                </TableCell>
                <TableCell align='right' className='tax'>
                  {ccyFormat(tax(row.qty, row.rate, row.cgst, 'sgst'))}
                  <br />
                  {ccyFormat(row.sgst)}%
                </TableCell>
                <TableCell align='right'>
                  {ccyFormat(
                    finalAmount(
                      row.rate,
                      row.qty,
                      row.discount,
                      row.cgst,
                      row.sgst
                    )
                  )}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={7}>Subtotal</TableCell>
              <TableCell align='right'>{ccyFormat(totalDiscount)}</TableCell>
              <TableCell align='right'>{ccyFormat(taxableFinal)}</TableCell>
              <TableCell align='right'>{ccyFormat(cgst)}</TableCell>
              <TableCell align='right'>{ccyFormat(sgst)}</TableCell>
              <TableCell align='right'>{ccyFormat(totalAmount)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Link
        to='/invoice'
        state={{
          taxableFinal: taxableFinal,
          cgst: cgst,
          sgst: sgst,
          totalAmount: totalAmount,
        }}
      >
        <button>Generate Invoice</button>
      </Link>
    </>
  )
}

export default DataTable
