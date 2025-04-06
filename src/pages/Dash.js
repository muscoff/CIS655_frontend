import React, {useState, useEffect} from 'react'
import Auth from '../components/Auth'
import Header from '../components/Header'
import Input from '../components/Input'
import { fetchDocs } from '../network/document'

import docIcon from "../docicon.png"

export default function Dash() {
    const [docs, setDocs] = useState([])
    const [allDocs, setAllDocs] = useState([])
    const [search, setSearch] = useState('')

    const onChange = e => {
        const val = e.target.value.toLowerCase()
        setSearch(val)
        if(val === '') return setDocs(allDocs)
        const arr = []
        allDocs.forEach(item=>{
            if(item?.doc_name.toLowerCase().indexOf(val) > -1) arr.push(item)
        })
        return setDocs(arr)
    }

    useEffect(()=>{
        fetchDocs(
            localStorage.getItem('doc-username'),
            (response)=>{
                setDocs(response?.data ?? [])
                setAllDocs(response?.data ?? [])
            },
            (err)=>console.log('err', err)
        )
    }, [])

    const openDoc = link => {
        const a = document.createElement('a')
        a.href = link
        a.setAttribute('target', '_blank')
        a.click()
    }

    const docList = docs.length === 0 ? <></> : docs.map((item, index)=>{
        return (
            <div className="col-2 col-l-3 col-m-4 col-s-6 padding-all-5" key={index}>
                <div>
                    <img src={docIcon} alt="document" className="img" />
                    <div className="bold-text">{item.doc_name}</div>
                    <br />
                    <button 
                        className="blue-bg white-text width-100" 
                        style={{padding: 5}}
                        onClick={()=>openDoc(item.doc_location)}
                    >
                        View
                    </button>
                </div>
                <br />
            </div>
        )
    })
  return (
    <Auth>
        <Header />
        <div className="padding-all-20" />

        <div className="width-90 margin-auto">
            <Input type="search" value={search} onChange={onChange} />
            <br />
            <br />

            <div className="row">
                {docList}
            </div>
        </div>

        <div className="padding-all-20" />
    </Auth>
  )
}
