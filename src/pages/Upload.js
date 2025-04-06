import React, {useState, useEffect} from 'react'
import Auth from '../components/Auth'
import Header from '../components/Header'
import Input from '../components/Input'
import Button from '../components/Button'
import { endpoint } from '../config/endpoint'
const { url_doc } = endpoint

export default function Upload() {
    const [file, setFile] = useState(null)
    const [docName, setDocName] = useState('')

    const onFile = e => setFile(e.target.files[0])

    const onSubmit = e => {
        e.preventDefault()
        if(!docName) return
        if(!file) return

        const doc_user = localStorage.getItem('doc-username')
        
        const formData = new FormData()
        formData.append('name', docName)
        formData.append('username', doc_user)
        formData.append('docfile', file)
        const context = {
            method: 'POST',
            headers:{'enctype': 'multipart/form-data'},
            body: formData
        }

        fetch(url_doc, context)
        .then(response=>response.json())
        .then(response=>{
            if(response.status){
                console.log(response)
                setDocName('')
                setFile(null)
                e.target.reset()
            }else{
                console.log(response)
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }
  return (
    <Auth>
        <Header />
        <div className="padding-all-20" />

        <div className="width-90 margin-auto">
            <div 
                className="card padding-all-10 width-lx-60 width-l-100 width-m-100 width-s-100 width-60 margin-auto rounded-5"
            >
                <form onSubmit={onSubmit}>
                    <div className="bold-text uppercase font-30 center-text">Upload a document</div>
                    <br />
                    <div>
                        <Input onChange={(e)=>setDocName(e.target.value)} type="text" value={docName} placeholder="Enter document name" />
                    </div>
                    <br />
                    <div>
                        <Input type="file" className="input" onChange={onFile} />
                    </div>
                    <br />
                    <div className="flex-row-reverse">
                        <Button name="Submit" className="blue-bg white-text" />
                    </div>
                </form>
            </div>
        </div>

        <div className="padding-all-20" />
    </Auth>
  )
}
