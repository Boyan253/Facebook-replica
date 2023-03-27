export const request = async (method, url, data) => {

    try {

        let requester;
        if (method === 'GET') {
            requester = fetch(url)
        } else {
            requester = fetch(url, {
                method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
        const response = await requester

        const result = await response.json()
        if (response.status === 204) {
            return {}
        }
        return result
    } catch (error) {
        console.log(error)
    }

}


export const get = request.bind(null, "GET")
export const post = request.bind(null, "POST")
export const del = request.bind(null, "DELETE")
export const put = request.bind(null, "PUT")