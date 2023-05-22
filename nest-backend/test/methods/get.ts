export function get(params: { url; token? }) {
    return request
        .get(params.url)
        .set('Authorization', 'Bearer ' + params.token);
}
