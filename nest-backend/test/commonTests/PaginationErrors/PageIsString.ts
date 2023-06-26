import { graphQlQuery } from '@test/methods/graphQlQuery';

type Params = {
    operation: string;
    fields: (string | object)[];
};

export async function paginationPageIsStringBadRequest(input: Params) {
    const { operation, fields } = input;

    const perPage = 'string value';
    const page = 'string value';

    const { status, body } = await graphQlQuery({
        operation,
        variables: {
            page: { value: page },
            perPage: { value: perPage }
        },
        fields
    });

    expect(status).toBe(400);
}
