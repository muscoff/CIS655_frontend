import React, { useState, createContext } from 'react'

export const Context = createContext({
    menu: false,
    setMenu: ()=>{}
})

export default function Provider({children}) {
    const [menu, setMenu] = useState(false)
  return (
    <Context.Provider value={{
        menu: menu,
        setMenu: ()=>setMenu(!menu)
    }}>
        {children}
    </Context.Provider>
  )
}
