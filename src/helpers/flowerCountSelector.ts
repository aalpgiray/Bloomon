/**
 * Extracts number of flowers in the bouquet from bouquet specification.
 * @param spec Bouquet specification
 * @returns Number of flowers in the bouquet
 */
export default function flowerCountSelector(spec: string): number {
  /**
   * We are only care about the last part of the spec. However, to replace
   */

  const expression = /\d+$/;
  const match = spec.match(expression);

  if (!match) {
    throw new Error("Number of flowers is not icluded in the spec");
  }

  /**
   * Parse to int should be safe, since its gurded by regex.
   */
  return parseInt(match[0]);
}
