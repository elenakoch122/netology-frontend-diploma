export default function validateDocument(type, value) {
    switch (type) {
        case 'series':
            return !!value.match(/^\d{4}$/);
        case 'passport':
            return !!value.match(/^\d{6}$/);
        case 'certificate':
            return !!value.match(
                /^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])-[А-Я]{2}-\d{6}$/
            );
        default:
            return false;
    }
}
