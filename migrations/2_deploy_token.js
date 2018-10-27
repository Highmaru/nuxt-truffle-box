const token = artifacts.require('./SampleToken.sol')

module.exports = async deployer => {
  await deployer.deploy(token)
}
