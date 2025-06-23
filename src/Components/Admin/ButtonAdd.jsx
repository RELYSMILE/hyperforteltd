import React from 'react'
import './Button.css'

const ButtonAdd = ({pageTitle}) => {
  if (pageTitle === 'Books Management'){
    pageTitle = 'Add New Book'
  }

  return (
    <div className='btn'>{pageTitle}</div>
  )
}

export default ButtonAdd