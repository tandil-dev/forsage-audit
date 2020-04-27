const SmartMatrixForsage = artifacts.require('SmartMatrixForsage.sol');
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const Web3 = require("web3");

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
            
            await smartMatrixForsage.registrationExt(owner, { from: alice, value: 50000000000000000 })

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

            console.log(accounts)
            await smartMatrixForsage.sendTransaction({ from: accounts[0], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            await smartMatrixForsage.sendTransaction({ from: accounts[1], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            await smartMatrixForsage.sendTransaction({ from: accounts[2], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            await smartMatrixForsage.sendTransaction({ from: accounts[3], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })
            await smartMatrixForsage.sendTransaction({ from: accounts[4], data: alice, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })


        })
    })

    describe('Check Matrix ', async () => {
        it('Check Matrix of the Owner', async () => {
            
            let usersX3Matrix = await smartMatrixForsage.usersX3Matrix(owner, 1)
            console.log(`Owner matrix:`)
            console.log( usersX3Matrix)

            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(alice, 1)
            console.log(`Alice matrix:`)
            console.log(usersX3Matrix)

            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(bob, 1)
            console.log(`Bob matrix:`)
            console.log( usersX3Matrix)

            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(max, 1)
            console.log(`Max matrix:`)
            console.log( usersX3Matrix)

            usersX3Matrix = await smartMatrixForsage.usersX3Matrix(jhon, 1)
            console.log(`Jhon matrix:`)
            console.log( usersX3Matrix)

            let usersX6Matrix = await smartMatrixForsage.usersX6Matrix(owner, 1)
            console.log(`Owner matrix:`)
            console.log( usersX6Matrix)

            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(alice, 1)
            console.log(`Alice matrix:`)
            console.log(usersX6Matrix)

            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(bob, 1)
            console.log(`Bob matrix:`)
            console.log( usersX6Matrix)

            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(max, 1)
            console.log(`Max matrix:`)
            console.log( usersX6Matrix)

            usersX6Matrix = await smartMatrixForsage.usersX6Matrix(jhon, 1)
            console.log(`Jhon matrix:`)
            console.log( usersX6Matrix)

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
            assert.equal(isUserActiveX3Level, true)


            //await smartMatrixForsage.sendTransaction({ from: jhon, data: max, gasLimit: 6721975, to: address, value: web3.utils.toWei(amount, "ether") })

            //matrix == 1 || matrix == 2
            //msg.value == levelPrice[level]
            //level > 1 && level <= LAST_LEVEL

            // levelPrice[1] = 0.025 ether;
            // for (uint8 i = 2; i <= LAST_LEVEL; i++) {
            //     levelPrice[i] = levelPrice[i - 1] * 2;
            // }
            //assert.equal(userExists, true);
        })
    })

    // describe('Print public var', async () => {
    //     it('Print public var', async () => {
    //         const address = smartMatrixForsage.address;
    //          console.log()
    //          console.log (await (smartMatrixForsage.users(alice) )
    //          console.log()
    //          console.log(await (smartMatrixForsage.usersX3Matrix(alice, 1) )
    //     })
    // })


});
