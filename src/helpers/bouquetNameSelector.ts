export default function bouquetNameSelector(spec: string): string {
  const expression = /^([A-Z])(S|L).+/;

  if (!spec.match(expression)) {
    throw new Error("Specification is faulty");
  }

  return spec.replace(/^([A-Z]).+/, "$1");
}
