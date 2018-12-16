import chai from "chai";
import flowerCountSelector from "../../src/helpers/flowerCountSelector";

const should = chai.should();

describe("flowerCountSelector", function() {
  it("should return total number of flowers in the bouquet", function() {
    const numberOfFlowers: number = flowerCountSelector("AS9a12");

    numberOfFlowers.should.be.equal(12);
  });
  it("should throw when the count spec is not exists", function() {
    should.throw(() => {
      flowerCountSelector("AS1a2b");
    });
  });
});
