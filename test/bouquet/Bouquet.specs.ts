import chai from "chai";
import { stub, spy } from "sinon";
import {
  mock,
  when,
  instance,
  deepEqual,
  anyFunction,
  anything
} from "ts-mockito";
import Bouquet, {
  BouquetNameSelector,
  BouquetSizeSelector,
  TotalQuantityOfFlowersSelector,
  FlowerSpeciesSelector
} from "../../src/bouquet/Bouquet";
import IBouquet from "../../src/bouquet/IBuquet";

import IInventory from "../../src/inventory/IInventory";
import Size from "../../src/enums/Size";
import Inventory from "../../src/inventory/Inventory";
import bouquetNameSelector from "../../src/helpers/bouquetNameSelector";
import bouquetSizeSelector from "../../src/helpers/bouquetSizeSelector";
import flowerCountSelector from "../../src/helpers/flowerCountSelector";
import flowerSpeciesSelector from "../../src/helpers/flowerSpeciesSelector";
import IFlower from "../../src/flower/IFlower";

const should = chai.should();

const mockInventory = mock<IInventory>(Inventory);

const bouquetFactory = (spec: string): IBouquet =>
  new Bouquet(
    bouquetNameSelector,
    bouquetSizeSelector,
    flowerCountSelector,
    flowerSpeciesSelector,
    instance(mockInventory),
    spec
  );

describe("Bouquet", function() {
  describe("arrange", function() {
    beforeEach(function() {
      when(mockInventory.getFlowerCount("a", Size.S)).thenReturn(1);
    });
    it("should return empty spec when inventory is empty", function() {
      const bouquet = bouquetFactory("AS1a2");

      when(mockInventory.getAllFlowers(Size.S)).thenReturn([]);

      const spec = bouquet.arrange();

      spec.should.be.deep.equal([]);
    });

    it("should return spec when inventory has every flower needed", function() {
      const inventory = [
        {
          size: Size.S,
          specie: "a"
        },
        {
          size: Size.S,
          specie: "b"
        },
        {
          size: Size.S,
          specie: "b"
        }
      ];
      when(mockInventory.getAllFlowers(Size.S)).thenReturn(inventory);

      when(mockInventory.query(anyFunction())).thenCall(selector => {
        return inventory.filter(selector);
      });

      const bouquet = bouquetFactory("AS1a3");
      const spec = bouquet.arrange();

      spec.should.be.deep.equal(["AS1a2b"]);
    });
  });
  describe("groupFlowers", function() {
    let inventory: IFlower[];
    let bouquet: IBouquet;
    beforeEach(function() {
      bouquet = bouquetFactory("AS1a3");
    });
    it("should group same species", function() {
      const inventory = [
        {
          size: Size.S,
          specie: "b"
        },
        {
          size: Size.S,
          specie: "b"
        }
      ];
      (bouquet as any).groupFlowers(inventory).should.be.deep.equal([
        {
          count: 2,
          specie: "b"
        }
      ]);
    });

    it("should group different species separately", function() {
      const inventory = [
        {
          size: Size.S,
          specie: "b"
        },
        {
          size: Size.S,
          specie: "a"
        },
        {
          size: Size.S,
          specie: "b"
        }
      ];
      (bouquet as any).groupFlowers(inventory).should.be.deep.equal([
        {
          count: 2,
          specie: "b"
        },
        {
          count: 1,
          specie: "a"
        }
      ]);
    });
  });
  describe("checkRequiredFlowers", function() {
    it("should return true when all the required flowers awailable");
    it("sould return false when some of the flowers are not awailable");
  });
  describe("getFillerFlowers", function() {
    it(
      "should return awailable flowers that are not used in the buquet before"
    );
    it("should return only flowers that fits sizewise.");
  });
});
