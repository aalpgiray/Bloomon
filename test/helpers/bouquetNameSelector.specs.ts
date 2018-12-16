import chai from "chai";
import bouquetNameSelector from "../../src/helpers/bouquetNameSelector";

const should = chai.should();

describe("bouquetNameSelector", function() {
  it("should return bouquet name", function() {
    const bouquetName: string = bouquetNameSelector("AL8d10r5t30");

    bouquetName.should.be.equal("A");
  });
  it("should throw when spec is faulty", function() {
    should.throw(function() {
      bouquetNameSelector("L8d10r5t30");
    });
  });
});
