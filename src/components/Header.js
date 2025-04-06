import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Header() {
    const navigation = useNavigate()
    const logout = () => {
        localStorage.removeItem('doc-username')
        navigation('/')
    }
  return (
    <div className="deep-blue-bg white-text padding-all-10">
        <div className="bold-text uppercase center-text font-25">
            Document management system
        </div>
        <br />
        <div className="flex-row justify-content-space-between">
            <div className="width-20"></div>
            <div className="flex-row justify-content-space-between">
                <div onClick={()=>navigation('/dashboard')}>
                    <span className="cursor-pointer">Search</span>
                </div>
                <div onClick={()=>navigation('/upload')}>
                    <span className="cursor-pointer">Upload</span>
                </div>
                <div onClick={()=>logout()}>
                    <span className="cursor-pointer">Logout</span>
                </div>
            </div>
            <div className="width-20"></div>
        </div>
    </div>
  )
}
