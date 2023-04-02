import * as  request from "./requester/requester";
let baseUrl = 'http://localhost:3005/posts/'


export async function addComment(postId, data) {
    const result = await request.post(baseUrl + postId + '/comments', data)
    console.log(result);
}