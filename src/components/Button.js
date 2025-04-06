import React from 'react'

export default function Button({name, className, onClick}) {
  return (
    <div>
        <button 
            className={className ?? ''}
            onClick={
                ()=>onClick ? onClick() : null
            }
        >
            {name ?? ''}
        </button>
    </div>
  )
}
