const { ethers } = require("hardhat")

const end = async () => {
    const multiDAOVoteAddress = ""

    const MULTIDAOVOTE = await ethers.getContractFactory("MULTIDAOVOTE")
    const multiDAOVote = await MULTIDAOVOTE.attach(multiDAOVoteAddress)

    try {
        await multiDAOVote.endMinting()
    } catch(err) {
        console.log(err.message)
    }
}

end()