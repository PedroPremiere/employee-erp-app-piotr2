import { post } from '@test/methods/post';

export type variable = {
    value: string | number;
    required?: boolean;
};

export type queryPayload = {
    operation: string;
    variables?: Record<string, variable>;
    fields: (string | object)[];
    lang?: string;
};

export function graphQlMutation(query: queryPayload) {
    const { operation, variables, fields, lang = 'en' } = query;

    const url = [`/graphql`, lang].join('?lang=');

    const payload = graph.mutation({
        operation,
        variables,
        fields
    });

    return post({ url, payload });
}
