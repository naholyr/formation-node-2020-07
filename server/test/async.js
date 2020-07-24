/* eslint-env mocha */

const { add_user, check_user } = require("../lib/db");
const { expect } = require("chai");

// TODO mock Redis (cf. sinon & rewire)

describe("DB", () => {
  before(() => {
    // eslint-disable-next-line no-console
    console.log("TODO clear DB");
  });

  it("should add user", async () => {
    await add_user("toto", "tata");
  });

  it("should check user (ok)", async () => {
    const result = await check_user("toto", "tata");
    expect(result).to.equal(true);
  });

  it("should check user (fail)", async () => {
    const result = await check_user("toto", "truc");
    expect(result).to.equal(false);
  });
});
