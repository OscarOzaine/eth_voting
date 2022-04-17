// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Election {
    address public owner;
    string public name;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    constructor(string memory _name) {
        owner = msg.sender;
        name = _name;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;

    // Store Voters Count
    uint public votersCount;

    // Fetch Candidate
    mapping(uint => Candidate) public candidates;

    // Store Candidates Count
    uint public candidatesCount;

    event votedEvent (
        uint indexed _candidateId
    );

    function storeCandidate (string memory _name) public {
        require(msg.sender == owner, "Only owner can store candidates");

        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender], "Address can only vote once");

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Only vote on existing candidates");

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        votersCount++;

        emit votedEvent(_candidateId);
    }
}