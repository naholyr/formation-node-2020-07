/* eslint-env mocha */

const { expect } = require("chai");
const {
  client,
  get_grid,
  init_grid,
  set_grid_cell,
  incr_player_score,
  get_scores,
  add_player,
} = require("../lib/db");

describe("Game", () => {
  before(async () => {
    await client.flushdb();
  });

  it("Init grid", async () => {
    await init_grid(128);
  });

  it("Get grid", async () => {
    const grid = await get_grid();
    expect(grid)
      .to.be.an("array")
      .and.to.have.length(128 ** 2);
    // @see https://www.chaijs.com/plugins/chai-arrays/
    expect(grid.every((x) => x === "")).to.equal(true);
  });

  describe("Set grid cell", () => {
    it("set cell", async () => {
      await set_grid_cell(1, 2, "paul");
      const grid = await get_grid();
      expect(grid[130]).to.be.equal("paul");
    });

    it("set cell not empty", async () => {
      const promise = set_grid_cell(1, 2, "bob");
      expect(promise).to.be.rejectedWith(Error, "Non null");
    });

    it("set cell out of range", async () => {
      const promise = set_grid_cell(200, 200, "bob");
      expect(promise).to.be.rejectedWith(Error, "Out of range");
    });
  });

  describe("Scores", () => {
    it("should modify scores", async () => {
      await add_player("jean");
      await incr_player_score("jean", 1);
      const first_scores = await get_scores();
      expect(first_scores).to.have.property("jean", 1);
      await incr_player_score("jean", 2);
      const second_scores = await get_scores();
      expect(second_scores).to.have.property("jean", first_scores.jean + 2);
    });
  });
});
