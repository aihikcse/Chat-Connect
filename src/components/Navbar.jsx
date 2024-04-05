import React from 'react';
import SignIn from './SignIn'
import LogOut from './LogOut'
import {auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
const style = {
    nav: `bg-pink-800 h-20 flex justify-between items-center p-4 w-full max-w-[728px] fixed`,
    heading: `text-white text-3xl`
}

const Navbar = () => {
    const [user] = useAuthState(auth)
    console.log(user)
  return (
    <div className={style.nav}>
      <h1 className={style.heading}>Chat-Connect</h1>
      <p></p>
      {user ? <LogOut /> : <SignIn />}

    </div>
  );
};

export default Navbar;