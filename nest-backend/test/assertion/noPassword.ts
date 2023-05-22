export function noPasswordAssertion(body) {
    expect(body.password).toBeFalsy();
}
