import React from 'react'

export default function Button(props) {
  return (
<button {...props}  className="active:bg-pink-300 h-10 w-64 text-white bg-pink-600 hover:bg-cyan-300  rounded-full hover:text-black text-xl  focus:ring-2 focus:ring-inset focus:ring-fuchsia-950">
  {props?.text}
</button>
  )
}
