// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./TokenCreator.sol";

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    TokenCreator creator;
    address public owner;
    string public name;

    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor(string memory _name) {
        creator = TokenCreator(msg.sender);
        owner = msg.sender;
        name = _name;
    }

    function changeName(string memory newName) public {
        require(msg.sender == address(creator), "Only owners can change coin name");
        // Only the creator can alter the name.
        // We compare the contract based on its
        // address which can be retrieved by
        // explicit conversion to address.
        name = newName;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == address(creator), "Only owners can mint");
        require(amount < 10000, "Only numbers below 10001");
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}

