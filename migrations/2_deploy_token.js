const token = artifacts.require('./SampleToken.sol')

module.exports = async deployer => {
  const name = "Sample Nuxtjs Token";
  const symbol = "SNUT";
  const decimals = 18;
  const totalSupply = 10000;
  await deployer.deploy(token, name, symbol, decimals, totalSupply)
}
