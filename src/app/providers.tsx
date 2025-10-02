"use client";

import React from 'react'
import { SessionProvider } from "next-auth/react"
//Use react context under the hood , so that we can give the session info accross all components rather than checkiong everytime again and again

export function Providers({children} : {children : React.ReactNode})  {
  return (
   <SessionProvider>
        {children}
   </SessionProvider>
  )
}


