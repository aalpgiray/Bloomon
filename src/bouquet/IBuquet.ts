export default interface IBuquet {
  /**
   * Outputs a spec if inventory has the required flowers.
   * @returns Maybe<spec>
   */
  arrange: () => [string?];
}
