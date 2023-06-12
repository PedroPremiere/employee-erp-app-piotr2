export function emptyListAssertion(status, body) {
    expect(status).toBe(200);
    expect(body).toEqual([]);
    /* todo - for pagination
    const { data, meta } = body;

    expect(data).toEqual([]);

    const { totalItems, currentPage, totalPages } = meta;

    expect(totalItems).toEqual(0);
    expect(currentPage).toEqual(1);
    expect(totalPages).toEqual(0);

 */
}
