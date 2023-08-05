const { expect } = require("chai")

describe("Mint", () => {

  it("should set admin address", async () => {
    const [ admin ] = await ethers.getSigners()
    const MULTIDAOVOTE = await ethers.getContractFactory("MULTIDAOVOTE")
    const multiDaoVote = await MULTIDAOVOTE.deploy()

    const adminContract = await multiDaoVote.admin()
    expect(adminContract).to.equal(admin.address)
  })

  it("should mint correct amount", async () => {
    const amount = ethers.utils.parseUnits("1200", "ether")
    const [ admin, user ] = await ethers.getSigners()

    const MULTIDAOVOTE = await ethers.getContractFactory("MULTIDAOVOTE")
    const multiDaoVote = await MULTIDAOVOTE.deploy()

    await multiDaoVote.mint(user.address, amount)

    const userBal = await multiDaoVote.balanceOf(user.address)
    const totalSupply = await multiDaoVote.totalSupply()
    const holders = (await multiDaoVote.holders()).toString()

    expect(userBal).to.equal(amount)
    expect(totalSupply).to.equal(totalSupply)
    expect(holders).to.equal("1")
  })

  it("should end minting", async () => {
    const amount = ethers.utils.parseUnits("1200", "ether")
    const [ admin, user ] = await ethers.getSigners()

    const MULTIDAOVOTE = await ethers.getContractFactory("MULTIDAOVOTE")
    const multiDaoVote = await MULTIDAOVOTE.deploy()

    await multiDaoVote.endMinting()

    // await multiDaoVote.mint(user.address, amount)
  })
})