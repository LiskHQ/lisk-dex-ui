![UI](https://github.com/LiskHQ/lisk-dex-ui/assets/121556982/b1ee0471-5111-4f37-a785-4dd5c5245b6f)

# Lisk DEX UI

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/liskHQ/lisk-dex-ui)
![GitHub repo size](https://img.shields.io/github/repo-size/liskhq/lisk-dex-ui)
[![DeepScan grade](https://deepscan.io/api/teams/6759/projects/8870/branches/113510/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&tid=19600&pid=23054&bid=773115)
![GitHub issues](https://img.shields.io/github/issues-raw/liskhq/lisk-dex-ui)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/liskhq/lisk-dex-ui)

Lisk DEX UI is an interactive user-interface and lean frontend for the DEX v1.0.0 and makes the user’s interaction as simple and efficient as possible, in terms of accomplishing user goals.

## Installation

It is possible to access Dex UI through the URL http://localhost:3002/.

If you wish to build the local version of Lisk DEX UI, execute the following command below to clone it:

```bash
git clone https://github.com/LiskHQ/lisk-dex-ui.git
```

Create `.env.local` file in the project directoy and put environment variables below.
```
NEXT_PUBLIC_PROJECT_ID=[Your WalletConnect Project Id]
NEXT_PUBLIC_RELAY_URL=wss://relay.walletconnect.com
NEXT_PUBLIC_TEST_NET=testnet
NEXT_PUBLIC_LISK_SERVICE_URL=https://testnet-service.lisk.com
NEXT_PUBLIC_DEX_SERVICE_URL=https://testnet-dex-service.lisk.com
NEXT_PUBLIC_DEX_SERVICE_WS_URL=wss://testnet-dex-service.lisk.com
```

Then install all necessary node modules to run the project.

```bash
cd [Project]
yarn install
yarn dev
```

### Run using docker

```bash
docker-compose -up
```

## Tests

### Automated tests

All automated tests will run with the below command.

```bash
npm test
```

## Technical Stack

- **Language**: HTML5, CSS, Typescript, Bash
- **Frameworks**:
  - Next.js (latest)
  - Socket.io
  - Lisk DEX Libraries
  - Custom Utility Libraries
  - Styled Components
- **Third Party Libraries**:
  - WalletConnect
  - Matrial UI
  - Axios
- **Code Formatting and Quality**: ESLint, Prettier, Prettier VSCode Extention and DeepScan
- **Testing**: Jest and React testing library
- **CI/CD**: Git, Jenkins, Docker, VPS
- **Database**: AWS S3
- **Version Control**: Github

## Contributors

https://github.com/LiskHQ/lisk-dex-ui/graphs/contributors

## License

Copyright 2016-2023 Lisk Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[lisk documentation site]: https://lisk.com/documentation
