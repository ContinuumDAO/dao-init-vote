import {ethers} from "hardhat"

async function main() {

    const initialSupply = 100000000

    const MultiDAO = await ethers.getContractFactory("MULTIDAOVOTE")
    const token = await MultiDAO.deploy(initialSupply)

    //await token.waitForDeployment()
    await token.deployed()

    const totalSupply = await token.totalSupply()
    const tokenAddr = await token.address

    console.log(`MULTIDAOVOTE address is ${tokenAddr}`)
    console.log(`Total supply of MULTIDAOVOTE minted was ${totalSupply}`)
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});