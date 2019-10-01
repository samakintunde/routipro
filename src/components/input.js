import React from 'react'

const Input = (props) => {
  const {id, name, type, handleChange } = props;

  return (
    <div>
      <input id={id} name={name} type={type} onChange={handleChange}/>
    </div>
  )
}

export default Input
