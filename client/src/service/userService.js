import * as  request from "./requester/requester";

let baseUrl = 'http://localhost:3005'


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