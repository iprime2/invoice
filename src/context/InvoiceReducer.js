const InvoiceReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        data: action.payload,
      }

    default:
      return { ...state }
  }
}

export default InvoiceReducer
