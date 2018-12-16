import IInventory from "../inventory/IInventory";
import IBuquet from "./IBuquet";
import Size from "../enums/Size";
import { groupBy } from "lodash";
import IFlower from "../flower/IFlower";

export interface IFlowerSpec {
  count: number;
  specie: string;
}
export type BouquetNameSelector = (spec: string) => string;
export type BouquetSizeSelector = (spec: string) => Size;
export type TotalQuantityOfFlowersSelector = (spec: string) => number;
export type FlowerSpeciesSelector = (spec: string) => IFlowerSpec[];

export default class Bouquet implements IBuquet {
  private name: string;
  private size: Size;
  private totalNumberOfFlowers: number;
  private requiredFlowers: IFlowerSpec[];
  private emptySpot: number;
  constructor(
    private bouquetNameSelector: BouquetNameSelector,
    private bouquetSizeSelector: BouquetSizeSelector,
    private totalQuantityOfFlowersSelector: TotalQuantityOfFlowersSelector,
    private flowerSpeciesSelector: FlowerSpeciesSelector,
    private inventory: IInventory,
    private spec: string
  ) {
    this.name = this.bouquetNameSelector(this.spec);
    this.size = this.bouquetSizeSelector(this.spec);
    this.totalNumberOfFlowers = this.totalQuantityOfFlowersSelector(this.spec);
    this.requiredFlowers = this.flowerSpeciesSelector(this.spec);
    this.emptySpot =
      this.totalNumberOfFlowers -
      this.requiredFlowers.reduce((a, b) => a + b.count, 0);
  }
  public arrange(): [string?] {
    if (!this.checkRequiredFlowers()) {
      return [];
    }

    if (!this.checkInventory()) {
      return [];
    }

    let usedFlowers = this.requiredFlowers
      .map(requiredFlower => requiredFlower.count + requiredFlower.specie)
      .join("");

    if (this.emptySpot > 0) {
      const otherFlowers = this.getFillerFlowers();

      if (otherFlowers.reduce((a, b) => a + b.count, 0) < this.emptySpot) {
        return [];
      }

      usedFlowers += otherFlowers
        .map(flower => flower.count + flower.specie)
        .join("");
    }

    return [`${this.name}${this.size}${usedFlowers}`];
  }

  private getFillerFlowers() {
    const otherFlowers = this.inventory.query(
      flower =>
        !this.requiredFlowers.some(
          requiredFlower =>
            requiredFlower.specie === flower.specie && this.size === flower.size
        ) && flower.size === this.size
    );

    return this.groupFlowers(otherFlowers);
  }

  private groupFlowers(flowers: IFlower[]) {
    const grouped = groupBy<IFlower>(flowers, "specie");

    const groupedSpecies: IFlowerSpec[] = [];
    for (const key in grouped) {
      if (grouped.hasOwnProperty(key)) {
        const element = grouped[key];

        groupedSpecies.push({
          count: element.length,
          specie: key
        });
      }
    }

    return groupedSpecies;
  }

  private checkRequiredFlowers() {
    return this.requiredFlowers.every(f => {
      return this.inventory.getFlowerCount(f.specie, this.size) === f.count;
    });
  }
  private checkInventory() {
    return (
      this.inventory.getAllFlowers(Size.S).length >= this.totalNumberOfFlowers
    );
  }
}
