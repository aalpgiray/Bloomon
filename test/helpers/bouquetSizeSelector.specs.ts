import chai from "chai";
import Size from "../../src/enums/Size";
import bouquetSizeSelector from "../../src/helpers/bouquetSizeSelector";

const should = chai.should();

describe("bouquetSizeSelector", function() {
  it("should return bouquet size", function() {
    const bouquetSize: Size = bouquetSizeSelector("AS8d10r5t30");
    bouquetSize.should.be.equal("S");
  });
  it("should throw when size is not exists", function() {
    should.throw(function() {
      bouquetSizeSelector("A8d10r5t30");
    });
  });

  it("should throw when size is out of spec", function() {
    should.throw(function() {
      bouquetSizeSelector("AM8d10r5t30");
    });
  });
});
