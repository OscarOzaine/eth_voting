const { expect } = require("chai"); 
const { ethers } = require("hardhat");

describe("Coin", function () {
    let Coin;
    let coin;
    let TokenCreator;
    let tokenCreator;
    let deployer;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        // Get the ContractFactories and Signers here.
        TokenCreator = await ethers.getContractFactory("TokenCreator");
        Coin = await ethers.getContractFactory("Coin");
        [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contracts
        tokenCreator = await TokenCreator.deploy();
        coin = await Coin.deploy('coin');
    });
  
    it("Owner should be able to mint coins", async function () {
        await coin.connect(deployer).mint(addr1.address, 10);
        expect(await coin.owner()).to.equal(deployer.address);
        expect(await coin.name()).to.equal('coin');
        expect(await coin.balances(addr1.address)).to.equal(10);
    });

    it("Non-owner should not be able to mint coins", async function () {
        await expect(
            coin.connect(addr1).mint(addr2.address, 10)
        ).to.be.revertedWith("Only owners can mint");
    });

    it("Large numbers should not be minted", async function () {
        await expect(
            coin.connect(deployer).mint(addr2.address, 10001)
        ).to.be.revertedWith("Only numbers below 10001");
    });

    it("Owner should be able to send coins", async function () {
        await coin.connect(deployer).mint(addr1.address, 100)

        await expect(coin.connect(addr1).send(addr2.address, 10))
            .to.emit(coin, "Sent")
            .withArgs(
                addr1.address,
                addr2.address,
                10,
            );

        expect(await coin.balances(addr2.address)).to.equal(10);
    });

    it("Owner should be able to send coins", async function () {
        await coin.connect(deployer).mint(addr1.address, 100)

        await expect(coin.connect(addr1).send(addr2.address, 10))
            .to.emit(coin, "Sent")
            .withArgs(
                addr1.address,
                addr2.address,
                10,
            );

        expect(await coin.balances(addr2.address)).to.equal(10);
    });

    it("Owner can change coin name", async function () {
        await coin.connect(deployer).changeName('foo-coin');
        expect(await coin.name()).to.equal('foo-coin');
    });

    it("Non-Owner can not change coin name", async function () {
        await expect(
            coin.connect(addr1).changeName('coin-name')
        ).to.be.revertedWith("Only owners can change coin name");
    });

    it("Token creator can create coins", async function () {
        const newCoin = await tokenCreator.connect(deployer).createCoin('foo-coin');
        expect(newCoin.hash).to.be.string;
    });

    it("Token creator can change coin name", async function () {
        // @TODO figure this out, how do we test ?
        const changedCoin = await tokenCreator.connect(deployer).changeName(
            coin.address,
            'foo-coin'
        );
        expect(changedCoin.hash).to.be.string;
    });
});
