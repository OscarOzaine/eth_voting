// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Coin.sol";

contract TokenCreator {
    function createCoin(string memory name)
        public
        returns (Coin tokenAddress)
    {
        // Create a new `Token` contract and return its address.
        // From the JavaScript side, the return type
        // of this function is `address`, as this is
        // the closest type available in the ABI.
        return new Coin(name);
    }
}