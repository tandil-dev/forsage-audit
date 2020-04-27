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
|  Methods                                 ·                5 gwei/gas                ·       198.12 usd/eth       │
·······················|···················|··············|·············|·············|··············|··············
|  Contract            ·  Method           ·  Min         ·  Max        ·  Avg        ·  # calls     ·  usd (avg)  │
·······················|···················|··············|·············|·············|··············|··············
|  Migrations          ·  setCompleted     ·           -  ·          -  ·      27341  ·           3  ·       0.03  │
·······················|···················|··············|·············|·············|··············|··············
|  SmartMatrixForsage  ·  registrationExt  ·      347694  ·     398318  ·     373006  ·           4  ·       0.37  │
·······················|···················|··············|·············|·············|··············|··············
|  Deployments                             ·                                          ·  % of limit  ·             │
···········································|··············|·············|·············|··············|··············
|  Migrations                              ·           -  ·          -  ·     164175  ·       2.4 %  ·       0.16  │
···········································|··············|·············|·············|··············|··············
|  SmartMatrixForsage                      ·           -  ·          -  ·    6177430  ·      91.9 %  ·       6.12  │
·------------------------------------------|--------------|-------------|-------------|--------------|-------------·

  7 passing (6s)