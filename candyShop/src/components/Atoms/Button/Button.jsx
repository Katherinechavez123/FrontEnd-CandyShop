import React from 'react'

export default function Button(props) {
  return (
<button   className="active:bg-pink-300 h-10 w-64 text-white bg-pink-600 hover:bg-cyan-300  rounded-full hover:text-black text-xl">
{props.text}
</button>
  )
}
