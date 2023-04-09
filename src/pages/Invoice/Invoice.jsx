import { Link, useLocation } from 'react-router-dom'
import './invoice.scss'

import React from 'react'

const Invoice = ({ invoiceArray }) => {
  const location = useLocation()
  const { state } = location
  const { taxableFinal, cgst, sgst, totalAmount } = state

  const ccyFormat = (num) => {
    if (!num) {
      return
    }
    return `${num.toFixed(2)}`
  }

  const handlePrint = () => {
    console.log('hi')
    window.print()
  }

  return (
    <div className='invoice'>
      {invoiceArray ? (
        <>
          <div className='topLevel'>
            <span className='one'>GSTIN: 2784512641</span>
            <span className='two'>Tax Invoice</span>
            <span className='three'></span>
          </div>
          <br />
          <div className='levelOne'>
            <div className='left'>ROS</div>
            <div className='center'>
              <span>RETAIL OUTLET STORE</span>
              <span>12/34 Mall Road, Mumbai</span>
              <span>Maharashtra</span>
              <span>Tel: +919876543210</span>
              <span>Email: retailoutlets@gmail.com</span>
            </div>
            <div className='right'>Retail Group</div>
          </div>
          <hr className='hrLine' />
          <div className='levelTwo'>
            <div className='levelTwoLeft'>
              <div className='levelTwoLeftTop'>
                <h3>Party Details</h3>
                <span>SUPER MART CO. PVT LTD</span>
                <span>56/78 SUPER MART ROAD, NEAR LANDMARK, MUMBAI</span>
                <span>MAHARASHTRA-400002</span>
                <br />
                <div className='items'>
                  <span className='title'>Party PAN</span>:
                  <span className='info'>VWXYZ1234U</span>
                </div>
                <div className='items'>
                  <span className='title'>Party Tel</span>:
                  <span className='info'>{invoiceArray[0]?.mobile}</span>
                </div>
                <div className='items'>
                  <span className='title'>Party GSTIN/UIN</span>:
                  <span className='info'>{invoiceArray[0]?.gstin}</span>
                </div>
              </div>
              <div className='levelTwoLeftRight'>
                <div className='items'>
                  <span className='title'>Invoice No.</span>:
                  <span className='info'>{invoiceArray[0]?.invoiceNo}</span>
                </div>
                <div className='items'>
                  <span className='title'>Invoice Date</span>:
                  <span className='info'>{invoiceArray[0]?.date}</span>
                </div>
                <div className='items'>
                  <span className='title'>Date of supply</span>:
                  <span className='info'>27/03/2023</span>
                </div>
                <div className='items'>
                  <span className='title'>Place of Supply</span>:
                  <span className='info'>MAHARASHTRA(27)</span>
                </div>
                <div className='items'>
                  <span className='title'>REVERSE CHARGE</span>:
                  <span className='info'>N</span>
                </div>
                <div className='items'>
                  <span className='title'>TRANSPORT</span>:
                  <span className='info'>BY ROAD</span>
                </div>
                <div className='items'>
                  <span className='title'>Vechile No.</span>:
                  <span className='info'>MH01AA1234</span>
                </div>
              </div>
            </div>
            <div className='levelTwoRight'></div>
          </div>
          <hr className='hrLine' />
          <div className='levelThree'>
            <div className='levelThreeTitle'>
              <span>SR.NO.</span>
              <span>PRODUCT</span>
              <span>HSN CODE</span>
              <span>UOM</span>
              <span>QTY</span>
              <span>RATE (INR)</span>
              <span>PRICE (INR)</span>
              <span>DISCOUNT (INR)</span>
              <span>TAXABLE VALUE (INR)</span>
              <span>CGST</span>
              <span>SGST</span>
              <span>AMOUNT (INR)</span>
            </div>
            {invoiceArray.map((item, index) => (
              <div className='levelThreeInfo' key={index}>
                <span>{index + 1}</span>
                <span>{item.product}</span>
                <span>{item.hsn}</span>
                <span>{item.uom}</span>
                <span>{ccyFormat(item.qty)}</span>
                <span>{ccyFormat(item.rate)}</span>
                <span>{ccyFormat(item.rate * item.qty)}</span>
                <span>
                  {ccyFormat(item.discount)}
                  <br />
                  {ccyFormat((item.discount / (item.qty * item.rate)) * 100)}%
                </span>
                <span>{ccyFormat(item.rate * item.qty - item.discount)}</span>
                <span>
                  {ccyFormat((item.cgst * item.rate * item.qty) / 100)}
                  <br />
                  {ccyFormat(item.cgst)}%
                </span>
                <span>
                  {ccyFormat((item.sgst * item.rate * item.qty) / 100)}
                  <br />
                  {ccyFormat(item.sgst)}%
                </span>
                <span>
                  {ccyFormat(
                    item.rate * item.qty -
                      (item.rate * item.qty * (item.sgst + item.cgst)) / 100 -
                      item.discount
                  )}
                </span>
              </div>
            ))}

            <div className='levelThreeSubTotal'>
              <h5>SUBTOTAL</h5>
              <span>{ccyFormat(taxableFinal)}</span>
              <span>{ccyFormat(cgst)}</span>
              <span>{ccyFormat(sgst)}</span>
              <span>{ccyFormat(totalAmount)}</span>
            </div>
          </div>
          <br />
          <div className='levelFour'>
            <div className='items'>
              <span className='itemTitle'>
                Total Invoice Amoount(in Figures)
              </span>
              :<span className='itemInfo'>5,995.00</span>
            </div>
            <div className='items'>
              <span className='itemTitle'>
                Total Invoice Amoount(in Wordss)
              </span>
              :
              <span className='itemInfo'>
                Five Thousand Nine Hundred And Ninty Five Only{' '}
              </span>
            </div>
          </div>
          <br />
          <br />
          <div className='levelFive'>
            <div className='levelFiveLeft'>
              <span className='termsHeader'>Terms & Conditions</span>
              <span>E. & O.E.</span>
              <div className='termsInfo'>
                <span>
                  1.GOODS ONCE SOLD WILL NOT BE EXCHNAGE/ RETUREND AFTER 7 DAYS
                </span>
                <span>
                  2.INTEREST @ 18%P.A WILL BE CHARGED AFTER 30 DAYS FROM BILL
                </span>
                <span>3.ALL DISPUTES SUBJECT TO MUMBAI JUSRIDICTION</span>
              </div>
            </div>
            <div className='levelFiveRight'>
              <div className='levelFiveRightTop'>Receiver's Signature</div>
              <br />
              <div className='levelFiveRightBottom'>
                <span>for RETAIL OUTLET STORE</span>

                <span>Authorised Signatory</span>
              </div>
            </div>
          </div>
          <button onClick={handlePrint}>Print</button>
          <br />
          <Link to='/'>
            <button>GO BACK</button>
          </Link>
        </>
      ) : (
        'Something went wrong go to back .....'
      )}
    </div>
  )
}

export default Invoice
