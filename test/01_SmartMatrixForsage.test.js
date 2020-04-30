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

    describe('Register New User referred by owner', async () => {
        it('New user registered successfully', async () => {
            
            console.log(" ANTES-------------------------------------------------")
            console.log(await web3.eth.getBalance(alice))

            await smartMatrixForsage.registrationExt(owner, { from: alice, value: 50000000000000000 })

            console.log(" DESPUES-------------------------------------------------")
            console.log(await web3.eth.getBalance(alice))

            const userExists = await smartMatrixForsage.isUserExists(alice)
            assert.equal(userExists, true);
            console.log(`alice: ${alice}`)



            const isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            assert.equal(isUserActiveX3Level, true)

            const isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            assert.equal(isUserActiveX6Level, true)


            const addressReferred3x = await smartMatrixForsage.findFreeX3Referrer(alice, 1)
            assert.equal(addressReferred3x, owner);

            const addressReferred6x = await smartMatrixForsage.findFreeX6Referrer(alice, 1)
            assert.equal(addressReferred6x, owner);

        })
    })

    describe('Register New User referred by user', async () => {
        it('New user registered successfully', async () => {
            
            await smartMatrixForsage.registrationExt(alice, { from: bob, value: 50000000000000000 })

            const userExists = await smartMatrixForsage.isUserExists(bob)
            assert.equal(userExists, true);
            console.log(`bob: ${bob}`)

            const isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(bob, 1)
            assert.equal(isUserActiveX3Level, true)

            const isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(bob, 1)
            assert.equal(isUserActiveX6Level, true)

            const addressReferred3x = await smartMatrixForsage.findFreeX3Referrer(bob, 1)
            assert.equal(addressReferred3x, alice);

            const addressReferred6x = await smartMatrixForsage.findFreeX6Referrer(bob, 1)
            assert.equal(addressReferred6x, alice);

        })
    })

    describe('Register New User by fallback function', async () => {
        it('New user registered successfully', async () => {

            const address = smartMatrixForsage.address;
            const amount = '0.05';
            await smartMatrixForsage.sendTransaction({ from: max, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            const userExists = await smartMatrixForsage.isUserExists(max)
            assert.equal(userExists, true);
            console.log(`max: ${max}`)

            const isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(max, 1)
            assert.equal(isUserActiveX3Level, true)

            const isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(max, 1)
            assert.equal(isUserActiveX6Level, true)

            const addressReferred3x = await smartMatrixForsage.findFreeX3Referrer(max, 1)
            assert.equal(addressReferred3x, owner);

            const addressReferred6x = await smartMatrixForsage.findFreeX6Referrer(max, 1)
            assert.equal(addressReferred6x, owner);

        })
    })

    describe('Register New User referred by user by fallback function', async () => {
        it('New user registered successfully', async () => {

            const address = smartMatrixForsage.address;
            const amount = '0.05';
            await smartMatrixForsage.sendTransaction({ from: jhon, data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })

            const userExists = await smartMatrixForsage.isUserExists(jhon)
            assert.equal(userExists, true);
            console.log(`jhon: ${jhon}`)

            const isUserActiveX3Level= await smartMatrixForsage.usersActiveX3Levels(jhon, 1)
            assert.equal(isUserActiveX3Level, true)

            const isUserActiveX6Level= await smartMatrixForsage.usersActiveX6Levels(jhon, 1)
            assert.equal(isUserActiveX6Level, true)

            const addressReferred3x = await smartMatrixForsage.findFreeX3Referrer(jhon, 1)
            assert.equal(addressReferred3x, alice);

            const addressReferred6x = await smartMatrixForsage.findFreeX6Referrer(jhon, 1)
            assert.equal(addressReferred6x, alice);

        })
    })

    describe('Check Owner Matrix overflow', async () => {
        it('Check Owner Matrix overflow', async () => {

            const address = smartMatrixForsage.address;
            const amount = '0.05';

            console.log("is User Active 0 :")
            let isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)
            let isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)
            let usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            // console.log(`Owner X3 matrix:`)
            // console.log(usersX3Matrix)
            // let usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            // console.log(`Owner X6 matrix:`)
            // console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[5], data: owner, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            let userExists = await smartMatrixForsage.isUserExists(accounts[5])
            assert.equal(userExists, true);
            
            console.log("is User Active 1 :")
            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            // console.log(`Owner X3 matrix:`)
            // console.log(usersX3Matrix)
            // usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            // console.log(`Owner X6 matrix:`)
            // console.log(usersX6Matrix)
            
            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[6], data: owner, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[6])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            console.log("is User Active 2 :")
            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            // console.log(`Owner X3 matrix:`)
            // console.log(usersX3Matrix)
            // usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            // console.log(`Owner X6 matrix:`)
            // console.log(usersX6Matrix)
            
            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[7], data: owner, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[7])
            assert.equal(userExists, true);

            console.log("is User Active 3 :")
            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            // console.log(`Owner X3 matrix:`)
            // console.log(usersX3Matrix)
            // usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            // console.log(`Owner X6 matrix:`)
            // console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[8], data: owner, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[8])
            assert.equal(userExists, true);

            console.log("is User Active 4 :")
            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            // console.log(`Owner X3 matrix:`)
            // console.log(usersX3Matrix)
            // usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            // console.log(`Owner X6 matrix:`)
            // console.log(usersX6Matrix)

        })
    })

    describe('Check User Matrix overflow', async () => {
        it('Check User Matrix ', async () => {

            const address = smartMatrixForsage.address;
            const amount = '0.05';

            console.log("is User Active 0 :")
            
            let isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            console.log(isUserActiveX3Level)
            let isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            console.log(isUserActiveX6Level)
            let usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            console.log(`Owner X3 matrix:`)
            console.log(usersX3Matrix)
            let usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            console.log(`Owner X6 matrix:`)
            console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[9], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            let userExists = await smartMatrixForsage.isUserExists(accounts[9])
            assert.equal(userExists, true);
            
            //assert.equal(isUserActiveX3Level, true)
            console.log("is User Active 1 :")
            console.log(" -------------------------------------------------")
            console.log(await web3.eth.getBalance(alice))

            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            console.log(`Owner X3 matrix:`)
            console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            console.log(`Owner X6 matrix:`)
            console.log(usersX6Matrix)
            
            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[10], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[10])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            console.log("is User Active 2 :")
            console.log(" -------------------------------------------------")
            console.log(await web3.eth.getBalance(alice))


            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            console.log(`Owner X3 matrix:`)
            console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            console.log(`Owner X6 matrix:`)
            console.log(usersX6Matrix)
            
            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[11], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[11])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            console.log("is User Active 3 :")
            console.log(" -------------------------------------------------")
            console.log(await web3.eth.getBalance(alice))

            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            console.log(`Owner X3 matrix:`)
            console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            console.log(`Owner X6 matrix:`)
            console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[12], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[12])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            console.log("is User Active 4 :")
            console.log(" -------------------------------------------------")
            console.log(await web3.eth.getBalance(alice))


            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            console.log(`Owner X3 matrix:`)
            console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            console.log(`Owner X6 matrix:`)
            console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[13], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[13])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            console.log("is User Active 5 :")
            console.log(" -------------------------------------------------")
            console.log(await web3.eth.getBalance(alice))


            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            console.log(`Owner X3 matrix:`)
            console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            console.log(`Owner X6 matrix:`)
            console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[14], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[14])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            console.log("is User Active 6 :")
            console.log(" -------------------------------------------------")
            console.log(await web3.eth.getBalance(alice))


            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            console.log(`Owner X3 matrix:`)
            console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            console.log(`Owner X6 matrix:`)
            console.log(usersX6Matrix)

        })
    })

    describe.only('Check Deep Gas Cost ', async () => {
        it('Gast Cost ', async () => {

            const address = smartMatrixForsage.address;
            const amount = '0.05';
            let userExists;

            smartMatrixForsage = await SmartMatrixForsage.new(owner)
            await smartMatrixForsage.registrationExt(owner, { from: accounts[0], value: 50000000000000000 })
            
            try{
                for( let i= 1; i< accounts.length; i++ ) {
                    await smartMatrixForsage.registrationExt(accounts[i-1], { from: accounts[i], value: 50000000000000000 })
                    console.log(i)
                }
            } catch (e) {
                //espect error ('out of gas .... ' )
            }
            await smartMatrixForsage.buyNewLevel(1, 2, { from: accounts[0], value: web3.utils.toWei(amount, "ether") })
            await smartMatrixForsage.buyNewLevel(1, 2, { from: accounts[accounts.length-1], value: web3.utils.toWei(amount, "ether") })
            //ganache-cli --accounts 9999999 --mnemonic "much glory behind wash easily party river stamp first magic need giant"
 
        })
    })

    describe('Buy New Level', async () => {
        it('', async () => {
            const address = smartMatrixForsage.address;
            const amount = '0.05';

            let isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 2)
            assert.equal(isUserActiveX3Level, false)
            
            await smartMatrixForsage.buyNewLevel(1, 2, { from: alice, value: web3.utils.toWei(amount, "ether")} )
            
            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 2)
            console.log("level 2: " + isUserActiveX3Level)
            assert.equal(isUserActiveX3Level, true)

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