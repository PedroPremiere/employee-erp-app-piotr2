export function translate(phrase: string, locale: string) {
    return i18nService.__({
        phrase,
        locale
    });
}
