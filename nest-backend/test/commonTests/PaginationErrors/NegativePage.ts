import { graphQlQuery } from '@test/methods/graphQlQuery';

type Params = {
    operation: string;
    fields: (string | object)[];
};

export async function paginationPageIsNegativeBadRequest(input: Params) {
    const { operation, fields } = input;

    const perPage = -10;
    const page = -2;

    const { status, body } = await graphQlQuery({
        operation,
        variables: {
            page: { value: page },
            perPage: { value: perPage }
        },
        fields
    });

    const { errors } = body.errors[0];

    expect(status).toBe(200);

    const expectedDialog = [
        i18nService.__({
            phrase: 'moreThan0',
            locale: 'en'
        })
    ];

    expect(errors).toContainEqual(
        expect.objectContaining({
            field: 'page',
            messages: expect.arrayContaining(expectedDialog)
        })
    );

    expect(errors).toContainEqual(
        expect.objectContaining({
            field: 'perPage',
            messages: expect.arrayContaining(expectedDialog)
        })
    );
}
