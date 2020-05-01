Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


  Contract: SmartMatrixForsage
    Deployment
      ✓ Deploys successfully
    Added Owner
      ✓ Owner added successfully
    Register New User referred by owner
      ✓ New user registered successfully (347694 gas)
    Register New User referred by user
      ✓ New user registered successfully (398318 gas)
    Register New User by fallback function
      ✓ New user registered successfully (302883 gas)
    Register New User referred by user by fallback function
      ✓ New user registered successfully (387279 gas)
    Print public var
      ✓ Print public var

·------------------------------------------|----------------------------|-------------|----------------------------·
|   Solc version: 0.5.16+commit.9c3226ce   ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 6721975 gas  │
···········································|····························|·············|·····························
|  Methods                                 ·                8 gwei/gas                ·       213.09 usd/eth       │
·······················|···················|··············|·············|·············|··············|··············
|  Contract            ·  Method           ·  Min         ·  Max        ·  Avg        ·  # calls     ·  usd (avg)  │
·······················|···················|··············|·············|·············|··············|··············
|  Migrations          ·  setCompleted     ·           -  ·          -  ·      27341  ·           7  ·       0.05  │
·······················|···················|··············|·············|·············|··············|··············
|  SmartMatrixForsage  ·  buyNewLevel      ·      120209  ·     455575  ·     200437  ·           8  ·       0.34  │
·······················|···················|··············|·············|·············|··············|··············
|  SmartMatrixForsage  ·  registrationExt  ·      347694  ·     398318  ·     396292  ·         100  ·       0.68  │
·······················|···················|··············|·············|·············|··············|··············
|  Deployments                             ·                                          ·  % of limit  ·             │
···········································|··············|·············|·············|··············|··············
|  Migrations                              ·           -  ·          -  ·     164175  ·       2.4 %  ·       0.28  │
···········································|··············|·············|·············|··············|··············
|  SmartMatrixForsage                      ·           -  ·          -  ·    6177430  ·      91.9 %  ·      10.53  │
·------------------------------------------|--------------|-------------|-------------|--------------|-------------

  7 passing (6s)