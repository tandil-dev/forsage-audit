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
> Artifacts written to /Users/fberdun/code/rednit/forsage_audit/.coverage_artifacts/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: SmartMatrixForsage
    Deployment
      ✓ Deploys successfully
    Added Owner
owner: 0x4a9Ed40C154934b2f9fc8a3C1C50d67D99D70359
      ✓ Owner added successfully (132ms)
    Register New User referred by owner
alice: 0x97E0129C631812F97A731Ce362274103efb9A543
      ✓ New user registered successfully (589ms)
    Register New User referred by user
bob: 0x1B5a10bb8E9F1329b9c01f749a5fEd0D9AA2f48F
      ✓ New user registered successfully (462ms)
    Register New User by fallback function
max: 0xa0d32CBef2Ef73a347f8B6C5DEc2be42dd67c193
      ✓ New user registered successfully (449ms)
    Register New User referred by user by fallback function
jhon: 0x28fC274848700fF022E02B215f037bDC58aE19c8
[
  '0xDE48e3B67aA78E0c3c9941617C4f23b61DfC98A6',
  '0x22cFD4b166824CF7C4D23BD8234D8a709A791cD1',
  '0x74a144d83caCA75DEe3902775Cc6F1cEE28B0FAb',
  '0x2e1D517ae5bBE33588b8AEC79D6BAC624C383fFc',
  '0x3F3Bb63E2C7F94289184ec1edF8eEA725888ca58'
]
      ✓ New user registered successfully (1942ms)
    Check Matrix 
Owner matrix:
Result {
  '0': '0x0000000000000000000000000000000000000000',
  '1': [ '0x97E0129C631812F97A731Ce362274103efb9A543' ],
  '2': false
}
Alice matrix:
Result {
  '0': '0x4a9Ed40C154934b2f9fc8a3C1C50d67D99D70359',
  '1': [ '0x3F3Bb63E2C7F94289184ec1edF8eEA725888ca58' ],
  '2': true
}
Bob matrix:
Result {
  '0': '0x97E0129C631812F97A731Ce362274103efb9A543',
  '1': [],
  '2': false
}
Max matrix:
Result {
  '0': '0x4a9Ed40C154934b2f9fc8a3C1C50d67D99D70359',
  '1': [],
  '2': false
}
Jhon matrix:
Result {
  '0': '0x97E0129C631812F97A731Ce362274103efb9A543',
  '1': [],
  '2': false
}
Owner matrix:
Result {
  '0': '0x0000000000000000000000000000000000000000',
  '1': [
    '0x97E0129C631812F97A731Ce362274103efb9A543',
    '0xa0d32CBef2Ef73a347f8B6C5DEc2be42dd67c193'
  ],
  '2': [
    '0x1B5a10bb8E9F1329b9c01f749a5fEd0D9AA2f48F',
    '0x28fC274848700fF022E02B215f037bDC58aE19c8',
    '0x97E0129C631812F97A731Ce362274103efb9A543'
  ],
  '3': false,
  '4': '0x97E0129C631812F97A731Ce362274103efb9A543'
}
Alice matrix:
Result {
  '0': '0xa0d32CBef2Ef73a347f8B6C5DEc2be42dd67c193',
  '1': [ '0x3F3Bb63E2C7F94289184ec1edF8eEA725888ca58' ],
  '2': [],
  '3': true,
  '4': '0x0000000000000000000000000000000000000000'
}
Bob matrix:
Result {
  '0': '0x97E0129C631812F97A731Ce362274103efb9A543',
  '1': [
    '0xDE48e3B67aA78E0c3c9941617C4f23b61DfC98A6',
    '0x74a144d83caCA75DEe3902775Cc6F1cEE28B0FAb'
  ],
  '2': [],
  '3': false,
  '4': '0x0000000000000000000000000000000000000000'
}
Max matrix:
Result {
  '0': '0x4a9Ed40C154934b2f9fc8a3C1C50d67D99D70359',
  '1': [ '0x97E0129C631812F97A731Ce362274103efb9A543' ],
  '2': [ '0x3F3Bb63E2C7F94289184ec1edF8eEA725888ca58' ],
  '3': false,
  '4': '0x0000000000000000000000000000000000000000'
}
Jhon matrix:
Result {
  '0': '0x97E0129C631812F97A731Ce362274103efb9A543',
  '1': [
    '0x22cFD4b166824CF7C4D23BD8234D8a709A791cD1',
    '0x2e1D517ae5bBE33588b8AEC79D6BAC624C383fFc'
  ],
  '2': [],
  '3': false,
  '4': '0x0000000000000000000000000000000000000000'
}
      ✓ Check Matrix of the Owner (393ms)
    Buy New Level
      ✓  (173ms)


  8 passing (4s)

-------------------------|----------|----------|----------|----------|----------------|
File                     |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------------------|----------|----------|----------|----------|----------------|
 contracts/              |    80.35 |    57.29 |      100 |    81.71 |                |
  SmartMatrixForsage.sol |    80.35 |    57.29 |      100 |    81.71 |... 426,427,439 |
-------------------------|----------|----------|----------|----------|----------------|
All files                |    80.35 |    57.29 |      100 |    81.71 |                |
-------------------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
> solidity-coverage cleaning up, shutting down ganache server