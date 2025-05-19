import React from 'react'

function Button(
  { 
    children,
    type = 'button',
    bgColor = 'bg-blue-200',
    textColor = 'text-white',
    className = '',
    ...props
  }) {
  return (
    <button className = {`px-4 py-6 ${bgColor} ${className}${textColor}`}{...props}>
      {children}
    </button>
  )
}

export default Button
