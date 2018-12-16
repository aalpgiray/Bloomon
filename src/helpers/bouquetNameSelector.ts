/**
 * Extracts name of bouquet from bouquet specification.
 * @param spec Bouquet specification
 * @returns Name of bouquet
 */
export default function bouquetNameSelector(spec: string): string {
  /**
   * Bouquet name must be single upper case letter
   * Bouquet size must fallow bouquet name. However, this control migth not be required here.
   */
  const expression = /^[A-Z]/;
  const match = spec.match(expression);

  if (!match) {
    throw new Error("Specification is not starting with bouquet name");
  }

  return match[0];
}
