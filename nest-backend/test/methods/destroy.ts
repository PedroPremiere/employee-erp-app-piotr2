export function destroy(params: { url; token? }) {
    return request
        .delete(params.url)
        .set('Authorization', 'Bearer ' + params.token);
}
