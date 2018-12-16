import chai from "chai";
import flowerSpeciesSelector from "../../src/helpers/flowerSpeciesSelector";

const should = chai.should();

describe("flowerSpeciesSelector", function() {
  it("should return an array", function() {
    flowerSpeciesSelector("8a").should.be.instanceOf(Array);
  });
  it("should throw when spec is not has any flowerSpec", function() {
    should.throw(() => flowerSpeciesSelector(""));
  });
  it("should return an array with have at least one member", function() {
    const flowerSpecs = flowerSpeciesSelector("8a");

    flowerSpecs.length.should.be.greaterThan(0);
  });
  it("should return array of flowerSpecs", function() {
    const flowerSpecs = flowerSpeciesSelector("12a23b");

    flowerSpecs.should.be.instanceOf(Array);
    flowerSpecs[0].should.have.property("count");
    flowerSpecs[0].should.have.property("specie");
  });

  it("should return number of flowers correctly", function() {
    const flowerSpecs = flowerSpeciesSelector("21a");

    flowerSpecs[0].count.should.be.equal(21);
  });
  it("should return flower specie correctly", function() {
    const flowerSpecs = flowerSpeciesSelector("21a");

    flowerSpecs[0].specie.should.be.equal("a");
  });
});
