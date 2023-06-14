export function post(params: { url; payload?; token?: string }) {
    if (params.token) {
        return request
            .post(params.url)
            .send(params.payload)
            .set('Authorization', 'Bearer ' + params.token);
    }

    return request.post(params.url).send(params.payload);
}
