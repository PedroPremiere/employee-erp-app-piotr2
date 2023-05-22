export function noFoundAssertion(status, body) {
    expect(status).toBe(404);

    expect(body.message).toBe('Not Found');
    expect(body.statusCode).toBe(404);
}
