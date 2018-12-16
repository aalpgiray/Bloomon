export enum BouquetSize {
  S = "S",
  L = "L"
}

export default function bouquetSizeSelector(spec: string): BouquetSize {
  const expression = /^([A-Z])(S|L).+/;

  if (!spec.match(expression)) {
    throw new Error("Specification is faulty");
  }

  const bouquetSize: BouquetSize = spec.replace(
    expression,
    "$2"
  ) as BouquetSize;

  return bouquetSize;
}
