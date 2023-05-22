export function badRequestAssertion(status, body, message) {
    expect(status).toBe(400);

    expect(body).toEqual(
        expect.objectContaining({
            error: 'Bad Request',
            message,
            statusCode: 400
        })
    );
}
