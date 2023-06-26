import { graphQlQuery } from '@test/methods/graphQlQuery';

type Params = {
    operation: string;
    fields: (string | object)[];
};

export async function wrongSortableFieldBadRequest(input: Params) {
    const { operation, fields } = input;

    const { status, body } = await graphQlQuery({
        operation,
        variables: {
            orderBy: { value: 'Not sortable field' }
        },
        fields
    });

    const { errors } = body.errors[0];

    expect(status).toBe(200);

    const expectedDialog = [
        i18nService.__({
            phrase: 'notSortableField',
            locale: 'en'
        })
    ];

    expect(errors).toContainEqual(
        expect.objectContaining({
            field: 'orderBy',
            messages: expect.arrayContaining(expectedDialog)
        })
    );
}
