import {ethers} from "hardhat"
import fs from "fs"

const fromWei = ethers.utils.formatEther
const toWei = ethers.utils.parseEther


const multiDaoMainnetAddr = '0xF7c202D51Cb23Da8217bFbC61114721295C3D400'  // on Polygon Mainnet



async function main() {

    const multiVote = await ethers.getContractAt("MULTIDAOVOTE", multiDaoMainnetAddr)

    const totalSupply = await multiVote.totalSupply()

    console.log(`Total Supply of MULTIDAOVOTE is ${fromWei(totalSupply)}`)


}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
