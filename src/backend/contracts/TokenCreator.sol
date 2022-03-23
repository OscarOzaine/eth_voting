// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Coin.sol";

contract TokenCreator {
    function createCoin(string memory name)
        public
        returns (Coin coin)
    {
        // Create a new `Coin` contract and return its address.
        // From the JavaScript side, the return type
        // of this function is `address`, as this is
        // the closest type available in the ABI.
        return new Coin(name);
    }

    function changeName(Coin tokenAddress, string memory name) public {
        // Again, the external type of `tokenAddress` is
        // simply `address`.
        tokenAddress.changeName(name);
    }
}