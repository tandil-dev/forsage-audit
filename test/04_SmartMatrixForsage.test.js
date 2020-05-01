const SmartMatrixForsage = artifacts.require('SmartMatrixForsage.sol');
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
//const web3 = require("web3");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('SmartMatrixForsage', ([owner, alice, bob, max, jhon,...accounts]) => {
    let smartMatrixForsage;

    before(async () => {
        smartMatrixForsage = await SmartMatrixForsage.deployed();

    })
    
    describe('Deployment', async () => {
        it('Deploys successfully', async () => {
            const address = smartMatrixForsage.address;
            assert.notEqual(address, '');
            assert.notEqual(address, 0x0);
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })
    })

    describe('Added Owner', async () => {
        it('Owner added successfully', async () => {
            const userExists = await smartMatrixForsage.isUserExists(owner)
            assert.equal(userExists, true);
            console.log(`owner: ${owner}`)

            const isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)

            const isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)

        })
    })


});

// eth_getTransactionReceipt
// eth_getBlockByNumber
// eth_sendTransaction

// Transaction: 0x303129f8f89587b2e4ec795e57ac06f149370f47b36edbbf83afb46cc2200646
// Gas usage: 129145
// Block Number: 1001
// Block Time: Thu Apr 30 2020 03: 21: 39 GMT + 0200(hora de verano de Europa central)

// eth_getTransactionReceipt
// eth_getBlockByNumber
// eth_sendTransaction

// Transaction: 0xcdd1b1b7ae76da725791bd907c4ce0e8b90c2aafe41b2fd7b6789295eb03a80a
// Gas usage: 3053530
// Block Number: 1002
// Block Time: Thu Apr 30 2020 03: 21: 39 GMT + 0200(hora de verano de Europa central)


// cuando se renueva cada matrix se cobra del usuario
// el gas se cobra al ultimo en registrarse


/** Pruebas de mati
 *  Transaction: 0x02ab9c3f9cb0b8dd52a7746d37929bbb771808ead6f6e9587a3f977d86039698
  Gas usage: 6721975
  Block Number: 10002
  Block Time: Wed Apr 29 2020 23:08:27 GMT-0300 (Argentina Standard Time)
  Runtime Error: out of gas


 */