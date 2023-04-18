import * as  request from "./requester/requester";

let baseUrl = 'https://future-server.onrender.com'


export async function register(data) {
    const body = { username: data.username, email: data.email, password: data.password, repass: data.repass }
    const response = request.post(`${baseUrl}/register`, body)
    return response

}

export async function login(email, password) {
    const data = { email, password }
    const result = request.post(`${baseUrl}/login`, data)
    return result
}


export async function logout(accessToken) {
    try {
        await fetch(`${baseUrl}/logout`, {
            headers: {
                'authorization': accessToken
            }
        })

    } catch (err) {
        console.log(err);
    }
}

export async function editProfile(userId, data, auth) {
    console.log(data, userId);
    const result = await fetch(`${baseUrl}/profile/${userId}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "authorization": auth.payload
        },
        body: JSON.stringify(data)

    })
    return result
}


export async function getAllUsers() {
    const response = await fetch(`${baseUrl}/users`)
    const result = response.json()
    return result
}
