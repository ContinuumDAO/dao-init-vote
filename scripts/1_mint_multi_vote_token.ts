import {ethers} from "hardhat"

async function main() {

    // const initialSupply = 100000000

    // const MultiDAO = await ethers.getContractFactory("MULTIDAOVOTE")
    // const token = await MultiDAO.deploy(initialSupply)

    // //await token.waitForDeployment()
    // await token.deployed()

    // const totalSupply = await token.totalSupply()
    // const tokenAddr = await token.address

    // console.log(`MULTIDAOVOTE address is ${tokenAddr}`)
    // console.log(`Total supply of MULTIDAOVOTE minted was ${totalSupply}`)



    // const MultiDAOVote = await ethers.getContractFactory("MULTIDAOVOTE")
    // const token = await MultiDAOVote.deploy()

    // await token.deployed()

    // const tokenAddr = token.address
    // const symbol = await token.symbol()

    // console.log(`${symbol} address is ${tokenAddr}`)


    
    const MultiDAOVote = await ethers.getContractFactory("MULTIDAOVOTE")
    const tokenAddr = "0x3FA547BF686672E8DF30BCF35156dD97d26Ad604".toLowerCase()
    const token = await MultiDAOVote.attach(tokenAddr)
    
    const name = await token.name()
    const symbol = await token.symbol()
    const decimals = await token.decimals()

    console.log(`${name}\n${symbol}\n${decimals}`)
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});