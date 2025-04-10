const prod = true
const url = prod ? 'https://docman-backend-549720070094.us-central1.run.app/' : 'http://localhost:4000/'

export const endpoint = {
    url: url,
    url_doc: `${url}api/doc`
}