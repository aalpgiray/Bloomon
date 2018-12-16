interface IFlowerSpec {
  count: number;
  specie: string;
}
/**
 * Extracts flower specifications from bouquet specification.
 * @param spec Bouquet specification
 * @returns Array of IFlowerSpec
 */
export default function flowerSpeciesSelector(spec: string): IFlowerSpec[] {
  /**
   * flowerSpecs inside the bouquet spec is repeating in the form of
   * number and fallowing lowercase letter.
   */
  const expression = /(\d+)([a-z])/g;
  const match = spec.match(expression);

  if (!match) {
    throw new Error("Specification is not includes any flower spec");
  }

  /**
   * Each match is consists of number of flowers and flower specie
   * first expression is also capable of marking groups of matches
   * according to this spec.
   */
  const flowerSpecs = match.map<IFlowerSpec>(m => {
    const count = parseInt(m.replace(expression, "$1"));
    const specie = m.replace(expression, "$2");

    return {
      count,
      specie
    };
  });

  return flowerSpecs;
}
