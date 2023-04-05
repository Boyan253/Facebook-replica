import * as  request from "./requester/requester";

let baseUrl = 'https://thefuture-eta.vercel.app/'


export async function getAllPosts() {

    const response = await request.get(`${baseUrl}posts`)
    return response.posts
}

export async function createPost(userData) {

    // this is from the requester way, try it later \/
    // const response = await request.post(`${baseUrl}/posts`, userData)
    // return response

    const response = await fetch(`${baseUrl}posts`, {
        method: 'POST',
         mode: 'no-cors',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(userData)
    })

    const result = await response.json()

    return result.post
}

export async function getOnePost(postId) {
    const response = await request.get(`${baseUrl}posts/${postId}`)
    return response.singularPost
}


export async function editPost(postId, data, auth) {
    const result = await fetch(`${baseUrl}posts/${postId}`, {
         mode: 'no-cors',
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "authorization": auth.payload
        },
        body: JSON.stringify(data)

    })
    return result
}


export async function deletePost(postId) {
    const result = await request.get(`${baseUrl}delete/${postId}`)
    return result
}
