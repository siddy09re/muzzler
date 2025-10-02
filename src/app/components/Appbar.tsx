"use client";

import React from 'react'
import {signIn, signOut, useSession} from "next-auth/react"

const Appbar = () => {

        const session = useSession();


  return (
    <div className='justify-between flex px-4'>
      <div>
            Muzzler app
      </div>

      <div>
            {
                session.data?.user ? <button className='px-3 py-2 bg-blue-400 rounded-lg' onClick={() => signOut()}>Logout</button> 
                :  <button onClick={() => signIn()} className='px-3 py-2 bg-blue-400 rounded-lg'>Signin </button>  
            }
                 
      </div>
    </div>
  )
}

export default Appbar
