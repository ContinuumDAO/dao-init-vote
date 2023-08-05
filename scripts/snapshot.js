const { ethers } = require("hardhat")
const {veMultiAbi} = require("../contracts/abi/veMulti")
const dotenv = require("dotenv")
const fs = require("fs")

dotenv.config()

const chain = process.env.chain || "ethereum"

console.log(`Reading on ${ chain }..`)

const veBalancesFile = fs.readFileSync(`./ve_balances/${ chain }.json`)
const veBalancesCurrent = JSON.parse(veBalancesFile)

const veMultiAddresses = {
    ethereum: "0xbbA4115ecB1F811061eCb5A8DC8FcdEE2748ceBa",
    binance: "0x3f6727DefB15996d13b3461DAE0Ba7263CA3CAc5",
    fantom: "0xE564cBcD78A76fD0Bb716a8e4252DFF06C2e4AE7"
}

const endMultiChainTime = ethers.BigNumber.from("1689292800")  // 14th July 2023

async function snapshot() {

    if(veBalancesCurrent.length > 0) {
        console.log("File is not empty")
        process.exit(1)
    }

    let supply

    if(chain === "binance") supply = 814
    else if(chain === "fantom") supply = 376
    else supply = 414

    let balanceTotalWei = ethers.BigNumber.from("0")

    const veMulti = await ethers.getContractAt(veMultiAbi, veMultiAddresses[chain])

    const pause = (t) => {
        return new Promise((res, rej) => {
            setTimeout(() => (res("done")), t)
        })
    }

    for(let i = 1; i <= supply; i++) {
        await pause(500)
        let owner
        try {
            owner = await veMulti.ownerOf(i.toString())
        } catch(err) {
            console.log(`ID ${ i} doesn't exist`)
            continue
        }
        const vePowerWei = (await veMulti.balanceOfNFTAt(i.toString(), endMultiChainTime)).toString()
        const vePower = ethers.utils.formatUnits(vePowerWei, "ether")
        const veNft = { id: i, owner, vePowerWei, vePower }

        balanceTotalWei = balanceTotalWei.add(vePowerWei)

        console.log(i, balanceTotalWei.toString())

        veBalancesCurrent.push(veNft)
    }

    const balanceTotal = ethers.utils.formatUnits(balanceTotalWei, "ether")

    console.log(`Total voting power: ${ balanceTotal }`)

    fs.writeFileSync(`./ve_balances/${ chain }.json`, JSON.stringify(veBalancesCurrent, null, 4))
}


snapshot().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});