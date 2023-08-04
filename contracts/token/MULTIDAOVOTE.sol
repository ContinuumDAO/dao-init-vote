// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.19;


contract MULTIDAOVOTE {
    string public constant name = "Multi DAO Vote";
    string public constant symbol = "MULTIDAOVOTE";
    uint8 public constant decimals = 18;

    uint256 public totalSupply;
    uint256 public holders;
    
    address admin;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        admin = msg.sender;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (uint256 remaining) {
        return 0;
    }
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event Mint(address indexed _to, uint256 _amount);

    function mint(address _to, uint256 _amount) public {
        require(msg.sender == admin, "Admin only minting");

        balanceOf[_to] += _amount;
        totalSupply += _amount;
        if(balanceOf[_to] == 0) holders++;

        emit Mint(_to, _amount);
    }
}