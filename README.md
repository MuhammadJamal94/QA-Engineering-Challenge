# QA Engineering Challenge
## Introduction

This repository contains:
- The test plan for the integration of a third-party payment gateway into the e-commerce platform.

- Test case prioritisation document.

- Test automation suite that includes both UI (https://www.eneco.nl/) and API (https://gorest.co.in/) test cases, using Playwright.

## Tools & Programming Languages
  - TypeScript
  - Playwright
  
## Pipeline
 #### GitHub Actions
 - Trigger methods:
	 - Automatically with every new push or pull request on main
	 - Manually from the start pipeline button 

## Structure
```
# Project Structure

```bash
QA ENGINEERING CHALLENGE
├── .github
│   └── workflows
│       └── playwright.yml
├── data
│   ├── goRestData.json
│   └── testData.json
├── node_modules
├── pages
│   ├── BasePage.ts
│   ├── CalculatePage.ts
│   ├── ControlPage.ts
│   ├── FactsPage.ts
│   ├── HomePage.ts
│   └── OfferPage.ts
├── playwright-report
├── test-results
├── tests
│   ├── go-rest.spec.ts
│   └── sales-flow.spec.ts
├── utils
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
├── docs
│ ├── PaymentGatewayTestPlan.md # Detailed test plan
│ └── TestCasePrioritization.md # Test case prioritization strategy
└── README.md
```
## Setup Instructions
### Prerequisites

1.  **Node.js** (version 14 or higher)

2.  **Playwright**: This repository uses Playwright for both UI and API testing.

### Running the Tests

1. Clone the repository:

```bash

git clone https://github.com/MuhammadJamal94/QA-Engineering-Challenge.git

cd your-repo-url

```
2. Install dependencies:

```bash

npm install

```
3. Run all tests:

```bash

npm run test-ui-api

```
4. To run only UI tests:

```bash

npm run test-ui

```
5. To run only API tests:

```bash

npm run test-api

```

5. To run only UI tests in mobile mode:

```bash

npm run test-ui-mobile

```
### Configuration

-  **playwright.config.js**: Contains environment configurations, such as browser types and base URL.
  
## Reporting

Playwright HTML reports that can be accessed after test execution. Simply run:

```bash

npx  playwright  show-report

```
## Additional Notes

- This suite supports:
	-  **cross-browser testing** (Chromium, WebKit, and Firefox).
	-  **API	testing** using Playwright’s APIRequest.
	-  **Mobile web-view testing** for both Webkit and Chromium.

## Contributions

Feel free to contribute by opening issues or submitting pull requests.

## Authors and acknowledgment

Mohamad Hasanien
