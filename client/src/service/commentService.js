import * as  request from "./requester/requester";
let baseUrl = 'https://www.thefuture.com/posts/'


export async function addComment(postId, data) {
    const result = await request.post(baseUrl + postId + '/comments', data)
    console.log(result);
}

export const getComments = async (postId) => {
    try {
        const response = await fetch(baseUrl + postId + '/comments');
        console.log(response);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
