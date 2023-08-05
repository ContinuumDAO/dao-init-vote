const { ethers } = require("hardhat")
const fs = require("fs")


const fromWei = ethers.utils.formatEther
const toWei = ethers.utils.parseEther


const ethereumBalances = fs.readFileSync("./ve_balances/ethereum.json")
const binanceBalances = fs.readFileSync("./ve_balances/binance.json")
const fantomBalances = fs.readFileSync("./ve_balances/fantom.json")


const multiDAOVoteAddress = ""


async function distribute() {
    const [admin] = await ethers.getSigners()

    const eth_bal = JSON.parse(ethereumBalances)
    const bnb_bal = JSON.parse(binanceBalances)
    const ftm_bal = JSON.parse(fantomBalances)

    let totalWei = ethers.BigNumber.from("0")

    const chains = [eth_bal, bnb_bal, ftm_bal]
    const chainNames = ["ethereum", "binance", "fantom"]

    const MULTIDAOVOTE = await ethers.getContractFactory("MULTIDAOVOTE")
    const multiDAOVote = await MULTIDAOVOTE.attach(multiDAOVoteAddress)

    const minThreshold = 0.1

    let nTry = 0
    let failingID = ""
    const FailingID = new Error(`ID ${ failingID } has failed 3 times.`)

    for(let i = 0; i < chains.length; i++) {
        for(let j = 0; j < chains[i].length; j++) {
 
            const { id, owner, vePowerWei, vePower } = chains[i][j]

            if(Number(vePower) < minThreshold) continue

            if(nTry >= 2) {
              failingID = id
              throw FailingID
            }

            const gasBal = ethers.utils.formatUnits(await ethers.provider.getBalance(admin.address), "ether")
            console.log(`Chain ${chainNames[i]}`)
            console.log(`Gas balance: ${ gasBal } MATIC\n`)
            console.log(`\n\n${j}: ID ${id}, minting ${vePower}`)

            try {
              const tx = await multiDAOVote.mint(owner, ethers.BigNumber.from(vePowerWei))
              await tx.wait(1)
              totalWei = totalWei.add(vePowerWei)
              nTry = 0
            } catch(err) {
              nTry++
              i--
            }
        }

        const totalSupplyWei = await multiDAOVote.totalSupply()
        const totalSupply = ethers.utils.formatUnits(totalSupplyWei, "ether")
        const total = ethers.utils.formatUnits(totalWei, "ether")

        console.log(`Total minted: ${total} MultiDAOVote, total supply: ${totalSupply} MultiDAOVote`)
    }
}

distribute().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
