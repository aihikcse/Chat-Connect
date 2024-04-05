import React from 'react'
import {auth} from '../firebase'

const style = {
    button: `p-2 lg:px-4 md:mx-2 text-white text-center border border-solid border-white rounded hover:bg-indigo-600 hover: transition-colors duration-300 mt-1 md:mt-0 md:ml-1`
}


const LogOut = () => {
const signOut = () => {
    signOut(auth)
}

  return (
    <button onClick={() => auth.signOut()} className={style.button}>
        Logout
    </button>
  )
}

export default LogOut