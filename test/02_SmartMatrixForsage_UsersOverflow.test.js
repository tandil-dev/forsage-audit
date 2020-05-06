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
        await smartMatrixForsage.registrationExt(owner, { from: alice, value: 50000000000000000 })

    })
    
    describe('Check Owner Matrix overflow', async () => {
        it('Check Owner Matrix overflow', async () => {

            const address = smartMatrixForsage.address;
            const amount = '0.05';

            //console.log("is User Active 0 :")
            let isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)
            let isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)
            let usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            // //console.log(`Owner X3 matrix:`)
            // //console.log(usersX3Matrix)
            // let usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            // //console.log(`Owner X6 matrix:`)
            // //console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[5], data: owner, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            let userExists = await smartMatrixForsage.isUserExists(accounts[5])
            assert.equal(userExists, true);
            
            //console.log("is User Active 1 :")
            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            // //console.log(`Owner X3 matrix:`)
            // //console.log(usersX3Matrix)
            // usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            // //console.log(`Owner X6 matrix:`)
            // //console.log(usersX6Matrix)
            
            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[6], data: owner, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[6])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            //console.log("is User Active 2 :")
            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            // //console.log(`Owner X3 matrix:`)
            // //console.log(usersX3Matrix)
            // usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            // //console.log(`Owner X6 matrix:`)
            // //console.log(usersX6Matrix)
            
            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[7], data: owner, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[7])
            assert.equal(userExists, true);

            //console.log("is User Active 3 :")
            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            // //console.log(`Owner X3 matrix:`)
            // //console.log(usersX3Matrix)
            // usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            // //console.log(`Owner X6 matrix:`)
            // //console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[8], data: owner, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[8])
            assert.equal(userExists, true);

            //console.log("is User Active 4 :")
            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(owner, 1)
            assert.equal(isUserActiveX3Level, true)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(owner, 1)
            assert.equal(isUserActiveX6Level, true)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            // //console.log(`Owner X3 matrix:`)
            // //console.log(usersX3Matrix)
            // usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            // //console.log(`Owner X6 matrix:`)
            // //console.log(usersX6Matrix)

        })
    })

    describe('Check User Matrix overflow', async () => {
        it('Check User Matrix ', async () => {

            const address = smartMatrixForsage.address;
            const amount = '0.05';

            //console.log("is User Active 0 :")
            
            let isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            //console.log(isUserActiveX3Level)
            let isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            //console.log(isUserActiveX6Level)
            let usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            //console.log(`Owner X3 matrix:`)
            //console.log(usersX3Matrix)
            let usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            //console.log(`Owner X6 matrix:`)
            //console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[9], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            let userExists = await smartMatrixForsage.isUserExists(accounts[9])
            assert.equal(userExists, true);
            
            //assert.equal(isUserActiveX3Level, true)
            //console.log("is User Active 1 :")
            //console.log(" -------------------------------------------------")
            //console.log(await web3.eth.getBalance(alice))

            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            //console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            //console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            //console.log(`Owner X3 matrix:`)
            //console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            //console.log(`Owner X6 matrix:`)
            //console.log(usersX6Matrix)
            
            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[10], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[10])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            //console.log("is User Active 2 :")
            //console.log(" -------------------------------------------------")
            //console.log(await web3.eth.getBalance(alice))


            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            //console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            //console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            //console.log(`Owner X3 matrix:`)
            //console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            //console.log(`Owner X6 matrix:`)
            //console.log(usersX6Matrix)
            
            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[11], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[11])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            //console.log("is User Active 3 :")
            //console.log(" -------------------------------------------------")
            //console.log(await web3.eth.getBalance(alice))

            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            //console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            //console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            //console.log(`Owner X3 matrix:`)
            //console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            //console.log(`Owner X6 matrix:`)
            //console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[12], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[12])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            //console.log("is User Active 4 :")
            //console.log(" -------------------------------------------------")
            //console.log(await web3.eth.getBalance(alice))


            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            //console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            //console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            //console.log(`Owner X3 matrix:`)
            //console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            //console.log(`Owner X6 matrix:`)
            //console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[13], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[13])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            //console.log("is User Active 5 :")
            //console.log(" -------------------------------------------------")
            //console.log(await web3.eth.getBalance(alice))


            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            //console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            //console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            //console.log(`Owner X3 matrix:`)
            //console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            //console.log(`Owner X6 matrix:`)
            //console.log(usersX6Matrix)

            //------------------------------------------------------------------ registration
            await smartMatrixForsage.sendTransaction({ from: accounts[14], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            userExists = await smartMatrixForsage.isUserExists(accounts[14])
            assert.equal(userExists, true);

            //assert.equal(isUserActiveX3Level, true)
            //console.log("is User Active 6 :")
            //console.log(" -------------------------------------------------")
            //console.log(await web3.eth.getBalance(alice))


            isUserActiveX3Level = await smartMatrixForsage.usersActiveX3Levels(alice, 1)
            //console.log(isUserActiveX3Level)
            isUserActiveX6Level = await smartMatrixForsage.usersActiveX6Levels(alice, 1)
            //console.log(isUserActiveX6Level)
            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            //console.log(`Owner X3 matrix:`)
            //console.log(usersX3Matrix)
            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            //console.log(`Owner X6 matrix:`)
            //console.log(usersX6Matrix)

        })
    })

    describe('Check Deep Gas Cost ', async () => {
        it('Gast Cost ', async () => {

            const address = smartMatrixForsage.address;
            const amount = '0.05';
            let userExists;

            smartMatrixForsage = await SmartMatrixForsage.new(owner)
            await smartMatrixForsage.registrationExt(owner, { from: accounts[0], value: 50000000000000000 })
            
            try{
                for( let i= 1; i< accounts.length; i++ ) {
                    await smartMatrixForsage.registrationExt(accounts[i-1], { from: accounts[i], value: 50000000000000000 })
                    //console.log(i)
                }
            } catch (e) {
                //espect error ('out of gas .... ' )
            }
            await smartMatrixForsage.buyNewLevel(1, 2, { from: accounts[0], value: web3.utils.toWei(amount, "ether") })
            await smartMatrixForsage.buyNewLevel(1, 2, { from: accounts[accounts.length-1], value: web3.utils.toWei(amount, "ether") })
            await smartMatrixForsage.buyNewLevel(2, 2, { from: accounts[0], value: web3.utils.toWei(amount, "ether") })
            await smartMatrixForsage.buyNewLevel(2, 2, { from: accounts[accounts.length-1], value: web3.utils.toWei(amount, "ether") })

        })
    })

});
