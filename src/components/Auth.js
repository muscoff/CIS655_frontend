import React, {useEffect} from 'react'

export default function Auth({children}) {
    useEffect(()=>{
        const user = localStorage.getItem('doc-username')
        if(!user){
            return window.location.href = '/'
        }
    })
  return (
    <>{children}</>
  )
}
