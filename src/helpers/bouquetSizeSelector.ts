export enum BouquetSize {
  S = "S",
  L = "L"
}
/**
 * Extracts size of bouquet from bouquet specification.
 * @param spec Bouquet specification
 * @returns Size of bouquet
 */
export default function bouquetSizeSelector(spec: string): BouquetSize {
  /**
   * Bouquet name must be single upper case letter
   * Bouquet size must fallow bouquet name and must be capital letter S or L
   */
  const expression = /^([A-Z])(S|L)/;
  const match = spec.match(expression);

  if (!match) {
    throw new Error("Specification is faulty");
  }
  /**
   * Bouquet size is either S or L, this is tested via regular expression.
   * Therefore, type cast to enum BouquetSize should be safe.
   */
  const bouquetSize: BouquetSize = match[0].replace(
    expression,
    "$2"
  ) as BouquetSize;

  return bouquetSize;
}
