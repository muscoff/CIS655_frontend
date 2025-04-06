import { endpoint } from '../config/endpoint'
const { url, url_doc } = endpoint

export const fetchDocs = async(user, func, errFunc) => {
    try{
        const response = await fetch(`${url_doc}?doc_user=${user}`)
        const data = await response.json()
        if(response.ok) return func(data)
        return errFunc(data.message)
    }catch(e){
        errFunc(e.message)
    }
}