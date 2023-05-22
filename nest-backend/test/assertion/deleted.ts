export function deletedAssertion(status, body) {
    expect(status).toBe(204);
    expect(body).toEqual({});
}
