// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract MULTIDAOVOTE is ERC20 {

    constructor(uint256 _supply)
        ERC20("MultiDAO voting token", "MULTIDAOVOTE")
    {
        _mint(msg.sender, _supply * 10**decimals());
    }

}