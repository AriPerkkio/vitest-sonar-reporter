### [0.3.4](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.3.3...v0.3.4) (2023-02-04)


### Bug Fixes

* match pathe version with vitest ([9f885d4](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/9f885d44977ebcf7c4e17198ee38006f2ca85789))
* remove benchmark task filtering ([976abd3](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/976abd3482e73664f228e9b82441efaa0a55eec3))
* remove typecheck tasks ([646187d](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/646187d7a798699a15be5036a2d00a22e0689f92))
* upgrade `pathe` major to match `vitest`'s version ([9e2a645](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/9e2a645b2fa81dbae3fe702575c4d36fcaefc555))

### [0.3.3](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.3.2...v0.3.3) (2022-11-08)


### Bug Fixes

* skip typechecks ([7cc1762](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/7cc17623813c158bfc8a5759a84f5f53950eb382))

### [0.3.2](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.3.1...v0.3.2) (2022-09-07)


### Features

* sort test files ([d3b13e9](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/d3b13e9a4bb3b631ed8d1844d26d27c0f250ad7d))


### Bug Fixes

* skip benchmarks ([#23](https://github.com/AriPerkkio/vitest-sonar-reporter/issues/23)) ([2c66e70](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/2c66e70d7a35cc4c1d0ea2b70e1771f50d5989f4))

### [0.3.1](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.3.0...v0.3.1) (2022-07-13)


### Bug Fixes

* add better failover case for duration not being found ([#17](https://github.com/AriPerkkio/vitest-sonar-reporter/issues/17)) ([452ab59](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/452ab59577b7893a4a18e439edd76cc9d995bf34))

## [0.3.0](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.2.1...v0.3.0) (2022-07-11)


### Bug Fixes

* logger API changes from `vitest@0.18.0` ([#16](https://github.com/AriPerkkio/vitest-sonar-reporter/issues/16)) ([befc4f8](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/befc4f89a9d593e4541deed7b0e29e36d08ce466)), closes [vitest-dev/vitest#1166](https://github.com/vitest-dev/vitest/issues/1166)

### [0.2.1](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.2.0...v0.2.1) (2022-06-14)


### Bug Fixes

* remove spread operator from generateXml ([#13](https://github.com/AriPerkkio/vitest-sonar-reporter/issues/13)) ([4cf7112](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/4cf7112a87db41a15dfc47539ac580f19a55f3cd))

## [0.2.0](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.1.1...v0.2.0) (2022-05-08)


### Features

* bump vitest peer-dep for vitest-dev/vitest[#1194](https://github.com/AriPerkkio/vitest-sonar-reporter/issues/1194) ([f99f5bf](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/f99f5bf07b78838303d8bda8c2505f8cd83ea0ee))

### [0.1.1](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.1.0...v0.1.1) (2022-04-17)


### Bug Fixes

* remove forbidden xml ([#11](https://github.com/AriPerkkio/vitest-sonar-reporter/issues/11)) ([77452bf](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/77452bfe2a690b1634efd36941214319933ef58b))

## [0.1.0](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.0.5...v0.1.0) (2022-04-10)


### Features

* support `config.outputFile["vitest-sonar-reporter"]` ([#10](https://github.com/AriPerkkio/vitest-sonar-reporter/issues/10)) ([ff8ea78](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/ff8ea7854c94d92fa642a6f7745d96fbbb444090)), closes [vitest-dev/vitest#1073](https://github.com/vitest-dev/vitest/issues/1073)

### [0.0.5](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.0.4...v0.0.5) (2022-03-24)


### Bug Fixes

* separate <file>s with newline ([3a22c8f](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/3a22c8ff465dfcdeb075145c0c02c6a58fedf443))

### [0.0.4](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.0.3...v0.0.4) (2022-03-24)


### Features

* escape xml ([e70d704](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/e70d70473174580c01c6c42e202bcaeb59564653))

### [0.0.3](https://github.com/AriPerkkio/vitest-sonar-reporter/compare/v0.0.2...v0.0.3) (2022-03-23)


### Features

* add work-around for vitest-dev/vitest[#991](https://github.com/AriPerkkio/vitest-sonar-reporter/issues/991) ([575c8ec](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/575c8ecbd0d528e930b0652a12228b39e0c57509))
* remove work-around for vitest-dev/vitest[#991](https://github.com/AriPerkkio/vitest-sonar-reporter/issues/991) ([cc0a935](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/cc0a935c2f2d4df55a19bdb5b4e4e182fe785bac))
* vitest as peerDependency ([9a0c613](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/9a0c6138e69f750f72f974cc46133f9127060adb))
* write files to report ([12cd4db](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/12cd4db8a8a9bf92f178b09730e34e70f9a46ddb))
* write testcases into report, initial ([#5](https://github.com/AriPerkkio/vitest-sonar-reporter/issues/5)) ([24ef65f](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/24ef65f4219dab5586dfaf69ae428847c3d4d3d6))
* write xml report ([b20da1a](https://github.com/AriPerkkio/vitest-sonar-reporter/commit/b20da1a601d0584f0f498384bae80f7aba388b99))

### 0.0.2 (2022-03-20)

