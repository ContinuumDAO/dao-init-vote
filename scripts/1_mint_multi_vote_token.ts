import {ethers} from "hardhat"

async function main() {

    const initialSupply = 10000000

    const MultiDAO = await ethers.getContractFactory("MULTIDAO")
    const token = await MultiDAO.deploy(initialSupply)

    await token.waitForDeployment()

    const totalSupply = await token.totalSupply()

    console.log(`Total supply of MULTIDAO minted was ${totalSupply}`)
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});