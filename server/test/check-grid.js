/* eslint-env mocha */

const { expect } = require("chai");
const { checkGrid } = require("../lib/grid-utils");

describe("Check grid", () => {
  it("empty grid", () => {
    const grid = Array(9).fill("");
    const result = checkGrid(grid, 3);
    expect(result).to.deep.equal([false, null]);
  });

  it("Check grid validation", () => {
    const grid = ["X", "", "O", "X", "O", "", "X", "", ""];
    const grid_res = checkGrid(grid, 3);
    expect(grid_res)
      .to.be.an("array")
      .and.to.have.length(2)
      .and.to.deep.equal([true, "X"]);
  });
});
