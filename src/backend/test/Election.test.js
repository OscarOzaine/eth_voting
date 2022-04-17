const { expect } = require("chai"); 
const { ethers } = require("hardhat");

describe("Election", function () {
    let Election;
    let election;
    let deployer;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        // Get the ContractFactories and Signers here.
        Election = await ethers.getContractFactory("Election");
        [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contracts
        election = await Election.deploy('Election 1');
    });
  
    it("Owner should be able to add candidates", async function () {
        await election.connect(deployer).storeCandidate('Candidate 1');
        await election.connect(deployer).storeCandidate('Candidate 2');

        expect(await election.owner()).to.equal(deployer.address);
        expect(await election.name()).to.equal('Election 1');
        expect(await election.candidatesCount()).to.equal(2);
        expect(await election.votersCount()).to.equal(0);

        const candidate1 = await election.connect(deployer).candidates(1);
        const candidate2 = await election.connect(deployer).candidates(2);
        
        expect(candidate1.name).to.equal('Candidate 1');
        expect(candidate1.voteCount).to.equal(0);

        expect(candidate2.name).to.equal('Candidate 2');
        expect(candidate2.voteCount).to.equal(0);
    });

    it("Address should be able to vote on candidate", async function () {
        await election.connect(deployer).storeCandidate('Candidate 1');
        await election.connect(deployer).storeCandidate('Candidate 2');
        
        expect(await election.votersCount()).to.equal(0);

        await election.connect(addr1).vote(1);
        const candidate1 = await election.connect(deployer).candidates(1);

        expect(await election.votersCount()).to.equal(1);
        expect(candidate1.name).to.equal('Candidate 1');
        expect(candidate1.voteCount).to.equal(1);
    });

    it("Address should not be able to vote twice on candidate", async function () {
        await election.connect(deployer).storeCandidate('Candidate 1');
        
        await election.connect(addr2).vote(1);
        await expect(
            election.connect(addr2).vote(1)
        ).to.be.revertedWith("Address can only vote once");
    });

    it("Address can only vote on existing candidates", async function () {
        await election.connect(deployer).storeCandidate('Candidate 1');
        
        await expect(
            election.connect(addr1).vote(0)
        ).to.be.revertedWith("Only vote on existing candidates");

        await expect(
            election.connect(addr1).vote(100)
        ).to.be.revertedWith("Only vote on existing candidates");
    });
});
