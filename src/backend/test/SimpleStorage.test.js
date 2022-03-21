const { expect } = require("chai"); 

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("SimpleContracts", function () {

  let SimpleStorage;
  let simpleStorage;
  let deployer;
  let addr1;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactories and Signers here.
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    [deployer, addr1, ...addrs] = await ethers.getSigners();

    // To deploy our contracts
    simpleStorage = await SimpleStorage.deploy();
  });

  describe("Storing Data", function () {
    it("Should store positive integer data", async function () {
      await simpleStorage.connect(addr1).set(100)
      expect(await simpleStorage.get()).to.equal(100);
    });

    it("Should fail on less than 50 integer data", async function () {
      await expect(
        simpleStorage.connect(addr1).set(5)
      ).to.be.revertedWith("Data has to be greater than 50");
    });
  });
});
