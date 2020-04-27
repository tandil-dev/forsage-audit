> Using Truffle library from global node_modules.

> server:            http://127.0.0.1:8555
> truffle:           v5.1.22
> ganache-core:      v2.10.2
> solidity-coverage: v0.7.4

Network Info
============
> id:      *
> port:    8555
> network: soliditycoverage


Instrumenting for coverage...
=============================

> SmartMatrixForsage.sol

Coverage skipped for:
=====================

> Migrations.sol

Compiling your contracts...
===========================
> Compiling ./.coverage_contracts/Migrations.sol
> Compiling ./.coverage_contracts/SmartMatrixForsage.sol
> Artifacts written to ./forsage_audit/.coverage_artifacts/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: SmartMatrixForsage
    Deployment
      ✓ Deploys successfully
    Added Owner
      ✓ Owner added successfully (66ms)
    Register New User referred by owner
      ✓ New user registered successfully (787ms)
    Register New User referred by user
      ✓ New user registered successfully (577ms)
    Register New User by fallback function
      ✓ New user registered successfully (404ms)
    Register New User referred by user by fallback function
      ✓ New user registered successfully (425ms)
    Print public var
      ✓ Print public var


  7 passing (3s)

-------------------------|----------|----------|----------|----------|----------------|
File                     |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------------------|----------|----------|----------|----------|----------------|
 contracts/              |    43.35 |    27.08 |    68.42 |       44 |                |
  SmartMatrixForsage.sol |    43.35 |    27.08 |    68.42 |       44 |... 427,439,443 |
-------------------------|----------|----------|----------|----------|----------------|
All files                |    43.35 |    27.08 |    68.42 |       44 |                |
-------------------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
> solidity-coverage cleaning up, shutting down ganache server