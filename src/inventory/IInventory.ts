import IFlower from "../flower/IFlower";
import Size from "../enums/Size";
export default interface IInventory {
  getAllFlowers: (size: Size.S) => IFlower[];
  getFlowerCount: (specie: string, size: Size) => number;
  query: (selector: (flower: IFlower) => boolean) => IFlower[];
}
