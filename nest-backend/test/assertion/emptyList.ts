export function emptyListAssertion(status, body) {
    expect(status).toBe(200);
    expect(body).toEqual([]);
}
