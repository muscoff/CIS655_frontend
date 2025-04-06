import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'

import { app } from '../config/fb'
import { 
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword 
} from 'firebase/auth'

export default function Home() {
    const navigation = useNavigate()
    const [error, setError] = useState({message: '', status: false})
    const [reg, setReg] = useState(false)
    const [state, setState] = useState({username: '', password: '', fullname: ''})
    const onChange = e => setState({...state, [e.target.name]: e.target.value})

    const auth = getAuth(app)

    const onSubmit = async(e) => {
        e.preventDefault()
        if(reg){
            const {username, password} = state
            createUserWithEmailAndPassword(auth, username, password)
            .then(user=>{
                console.log(user)
                setError({message: 'Account successfully created', status: false})
                setTimeout(()=>{
                    setError('')
                    setReg(!reg)
                }, 3000)
            })
            .catch(err=>{
                const err_or = err.message.split(' ')
                const errM = err_or[err_or.length-1].split('/')
                const errorMessage = errM[errM.length-1].split(')')[0]
                setError({message: errorMessage, status: true})
                setTimeout(()=>setError(''), 3000)
            })
        }else{
            const {username, password} = state
            signInWithEmailAndPassword(auth, username, password)
            .then(user=>{
                console.log(user)
                localStorage.setItem('doc-username', username)
                navigation('/dashboard')
            })
            .catch((err)=>{
                const errorMessage = err.message
                if(errorMessage.indexOf('wrong-password')){
                    setError({message: 'Invalid username or password', status: true})
                    setTimeout(()=>setError(''), 3000)
                }else{
                    setError({message: errorMessage, status: true})
                    setTimeout(()=>setError(''), 3000)
                }
            })
        }
    }
  return (
    <div>
        <div className="padding-all-20" />
        <div className="capitalize center-text bold-text font-50">
            Welcome to document management system
        </div>
        <br />
        <div className="width-30 width-l-50 width-m-70 width-s-90 margin-auto login-form-card padding-all-10">
            <form onSubmit={onSubmit}>
                {
                    reg && (
                        <div>
                            <label className="bold-text">Fullname</label>
                            <Input name="fullname" type='text' onChange={onChange} />
                            <br />
                        </div>
                    )
                }
                <div>
                    <label className="bold-text">Username(Email)</label>
                    <Input name="username" type='email' onChange={onChange} />
                    <br />
                </div>
                <div>
                    <label className="bold-text">Password</label>
                    <Input name="password" type='password' onChange={onChange} />
                </div>
                <br />
                <div>
                    <div>
                        <span className="italic">{reg?'Already':'Don\'t'} have an account?</span> <span className="bold-text blue-text cursor-pointer" onClick={()=>setReg(!reg)}>{reg?'Sign In': 'Sign Up'}</span>
                    </div>
                </div>
                <br />
                <div className={error.status ? 'red-text':'green-text'}>{error.message}</div>
                <br />
                <div className="flex-row-reverse">
                    <Button className="blue-bg white-text" name="Submit" />
                </div>
            </form>
        </div>
        <div className="padding-all-20" />
    </div>
  )
}
