export default function validateDocument(type, value) {
  switch (type) {
    case 'series':
      return !!value.match(/^\d{4}$/);
    case 'passport':
      return !!value.match(/^\d{6}$/);
    case 'certificate':
      return !!value.match(
        /^[A-Z]{3}-[A-Z]{2} \d{6}$/
      );
    default:
      return false;
  }
}