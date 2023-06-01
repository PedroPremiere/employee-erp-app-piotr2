export function badRequestAssertion(status, body, message) {
    expect(status).toBe(400);

    expect(body).toEqual(
        expect.objectContaining({
            errors: message,
            message: 'Bad Request',
            statusCode: 400
        })
    );
}
