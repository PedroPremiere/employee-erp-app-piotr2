export function unAuthorizedAssertion(status, body) {
    expect(status).toBe(401);

    expect(body).toEqual(
        expect.objectContaining({
            message: 'Unauthorized',
            statusCode: 401
        })
    );
}
