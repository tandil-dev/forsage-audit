# Forsage_Audit

##  
## Summary
**1. Test Coverage**

![](/docs/images/coverage.png)

**2. Eth/Gas Report**

![](/docs/images/gasReporter.png)

**3. Issues**

|  Findings  |Confidence                          |Severity                     |
|----------------|-------------------------------|-----------------------------|
|`Logical error` | Critical | Critical            
|`Functions that send ether to arbitrary destinations`|Medium | High |
|`Local variable never initialized` | Medium| Medium            |
|`Reentrancy vulnerabilities`| Medium | Informational|
|`Assembly usage`|High| Informational|
|`Incorrect versions of Solidity`|High| Informational|
|`Conformance to Solidity naming conventions`|High| Informational|
|`Public function that could be declared as external`|High| Optimization|

##  
## Findings
**1. Logical error**

    updateX6ReferrerSecondLevel(address,address,uint8)[#335]


Description
A statement indentation error was found. As a consequence a logic's branch will never execute

 Recommendation

    // [331-340]    
    if (x6.length == 2) {    
	    if (x6[0] == referrerAddress ||    
		    x6[1] == referrerAddress) {		    
                users[users[referrerAddress].x6Matrix[level].currentReferrer].x6Matrix[level].closedPart = referrerAddress;
        } // add this line to close the `if (x6.length == 2)` statement
    } else if (x6.length == 1) {    
        if (x6[0] == referrerAddress) {    
        users[users[referrerAddress].x6Matrix[level].currentReferrer].x6Matrix[level].closedPart = referrerAddress;    
        }	    
    }    
    } // delete this line that close the `if (x6.length == 2)` with `if (x6.length == 1)` statement inside
    

**2. Functions that send ether to arbitrary destinations**

    sendETHDividends(address,address,uint8,uint8) [#435]

Dangerous calls:

    ! address(uint160(receiver)).send(levelPrice[level]) [#438]
      address(uint160(receiver)).transfer(address(this).balance) [#439]

Configuration

- Check: arbitrary-send
- Severity: High
- Confidence: Medium

 Description
 Unprotected call to a function executing sending ethers to an arbitrary address.


Exploit Scenario:

    contract ArbitrarySend{

	    address destination;

	    function setDestination(){
		    destination = msg.sender;
		    } 

	    function withdraw() public{
		    destination.transfer(this.balance);
		    }
	    }


> Bob calls setDestination and withdraw. As a result he withdraws the
> contract's balance.

 Recommendation

Ensure that an arbitrary user cannot withdraw unauthorize funds.

**3. Local variable never initialized**

    findEthReceiver(address,address,uint8,uint8).isExtraDividends

  

Configuration

 - Check: uninitialized-local
 - Severity: Medium
 - Confidence: Medium

Description

Uninitialized local variables.

Exploit Scenario:

    contract Uninitialized is Owner{
    
	    function withdraw() payable public onlyOwner{
	    
		    address to;
		    
		    to.transfer(this.balance)
		    
		    }
 
    }

> Bob calls transfer. As a result, the ethers are sent to the address
> 0x0 and are lost.


Recommendation

Initialize all the variables. If a variable is meant to be initialized to zero, explicitly set it to zero.







**4. Reentrancy vulnerabilities**

Reentrancy in

    - buyNewLevel(uint8,uint8) [#116]
    - registration(address,address) [#152]
    - sendETHDividends(address,address,uint8,uint8) [#435]
    - updateX3Referrer(address,address,uint8) [#192]


Configuration

 - Check: reentrancy-unlimited-gas 
 - Severity: Informational 
 - Confidence: Medium

Description

Detection of the re-entrancy bug. Only report reentrancy that are based on transfer or send.

  

Exploit Scenario:

    function callme(){
	    msg.sender.transfer(balances[msg.sender]):
	    balances[msg.sender] = 0;
	    }

> send and transfer does not protect from reentrancies in case of
> gas-price change.

  

Recommendation

Apply the check-effects-interactions pattern.




**5. Assembly usage**

    registration(address,address)

Configuration

 - Check: assembly
 - Severity: Informational
  - Confidence: High

Description

The use of assembly is error-prone and should be avoided.

  
  
Recommendation

Do not use evm assembly.


**6. Incorrect versions of Solidity**

    Pragma version>=0.4.23<0.6.0 [#26] allows old versions


Configuration

 - Check: solc-version 
 - Severity: Informational 
 - Confidence: High

Description

Solc frequently releases new compiler versions. Using an old version prevents access to new Solidity security checks. We recommend avoiding complex pragma statement.

 
Recommendation

Use Solidity 0.4.25 or 0.5.11. Consider using the latest version of Solidity for testing the compilation, and a trusted version for deploying.


**7. Conformance to Solidity naming conventions**


    Parameter findEthReceiver(address,address,uint8,uint8)._from [#409] is not in mixedCase
    Parameter sendETHDividends(address,address,uint8,uint8)._from [#435] is not in mixedCase


Configuration

 - Check: naming-convention
 - Severity: Informational
 - Confidence: High

Description

Solidity defines a naming convention that should be followed.


Rules exceptions

    Allow constant variables name/symbol/decimals to be lowercase (ERC20)
    
    Allow _ at the beginning of the mixed_case match for private variables and unused parameters.

Recommendation

Follow the Solidity naming convention.


**8. Public function that could be declared as external**

    - SmartMatrixForsage.usersActiveX3Levels(address,uint8) [#383]
    
    - SmartMatrixForsage.usersActiveX6Levels(address,uint8) [#387]
    
    - SmartMatrixForsage.usersX3Matrix(address,uint8) [#391]
    
    - SmartMatrixForsage.usersX6Matrix(address,uint8) [#397]


Configuration

 - Check: external-function
 - Severity: Optimization
 - Confidence: High

Description

public functions that are never called by the contract should be declared external to save gas.


Recommendation

Use the external attribute for functions never called from the contract.



##  
## Conclusion














