export function post(params: { url; payload? }) {
    return request.post(params.url).send(params.payload);
}
