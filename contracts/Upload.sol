// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "hardhat/console.sol";

contract Upload {
    //0x1

    struct  Access {
        address user;
        bool access;
    }

    mapping(address=>string[]) value;
    mapping(address=>mapping(address=>bool)) ownership;
    mapping(address=>Access[]) accessList;
    mapping(address=>mapping(address=>bool)) previousData;


    function add(address _user,string memory _url) external {
        value[_user].push(_url);
    }

    function allow(address _user) external {
        ownership[msg.sender][_user] = true;

        if(previousData[msg.sender][_user]){
            for(uint i = 0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user==_user){
                    accessList[msg.sender][i].access = true;
                }
            }
        }else{
        accessList[msg.sender].push(Access(_user,true)); 
        previousData[msg.sender][_user] = true;
        }
    }

    function disallow(address _user) external {
        ownership[msg.sender][_user] = false;
        for(uint i = 0;i<accessList[msg.sender].length;i++){
            if(accessList[msg.sender][i].user==_user){
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function displayImages(address _user) external view returns(string[] memory) {
        console.log(_user,msg.sender);
        require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
        return value[_user];
    }

    function shareAccess() public view returns(Access[] memory) {
        return accessList[msg.sender];
    }
}