export default function prepareNumber(
  number: string,
  regexp?: RegExp,
  mask?: string
) {
  return number.replace(
    regexp ? regexp : /^(\d{3})(\d{3})(\d{2})(\d{2})/,
    mask ? mask : "($1) $2-$3-$4"
  )
}
