// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        require(x > 50, "Data has to be greater than 50");

        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
