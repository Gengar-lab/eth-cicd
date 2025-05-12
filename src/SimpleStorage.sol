// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SimpleStorage {
    uint256 public value;

    function set(uint256 _val) public {
        value = _val;
    }
}
