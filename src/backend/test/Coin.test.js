const { expect } = require("chai"); 

describe("Coin", function () {
    let Coin;
    let coin;
    let deployer;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        // Get the ContractFactories and Signers here.
        Coin = await ethers.getContractFactory("Coin");
        [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contracts
        coin = await Coin.deploy('coin');
    });
  
    it("Owner should be able to mint coins", async function () {
        await coin.mint(addr1.address, 10);
        expect(await coin.minter()).to.equal(deployer.address);
        expect(await coin.name()).to.equal('coin');
        expect(await coin.balances(addr1.address)).to.equal(10);
    });
});
