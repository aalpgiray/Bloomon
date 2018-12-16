import IInventory from "./IInventory";
import IFlower from "../flower/IFlower";
import Size from "../enums/Size";

export default class Inventory implements IInventory {
  query(selector: (flower: IFlower) => boolean): IFlower[] {
    throw new Error("Not implemented");
  }
  getAllFlowers(size: Size): IFlower[] {
    throw new Error("Not implemented");
  }
  getFlowerCount(specie: string, size: Size): number {
    throw new Error("Not implemented");
  }
}
