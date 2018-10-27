import Web3 from 'web3'
const pkg = require('../../package')

const web3 = new Web3(Web3.givenProvider || pkg.truffle.host)

export default web3
