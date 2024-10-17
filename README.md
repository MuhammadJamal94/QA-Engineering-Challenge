# QA Engineering Challenge

## Introduction
This repository contains:

 - The test plan for the integration of a third-party payment gateway into the e-commerce platform. 
 - Test case prioritisation document.
 -  Test automation suite that includes both UI (https://www.eneco.nl/) and API  (https://gorest.co.in/) test cases, using Playwright.

## Structure

```
├── tests
│   ├── ui
│   │   ├── eneco-flow.spec.js       # UI test cases for Eneco sales flow
│   ├── api
│   │   ├── gorest-api.spec.js       # API test cases using GoREST API
├── docs
│   ├── test-plan.md                 # Detailed test plan
│   ├── test-case-prioritization.md  # Test case prioritization strategy
├── config
│   ├── playwright.config.js         # Configuration for Playwright
├── README.md
```

## Setup Instructions

### Prerequisites
1. **Node.js** (version 14 or higher)
2. **Playwright**: This repository uses Playwright for both UI and API testing.
   Install it using:
   ```bash
   npm install playwright
   ```

### Running the Tests
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd your-repo-url
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run all tests:
   ```bash
   npx playwright test
   ```

4. To run only UI tests:
   ```bash
   npx playwright test ui/
   ```

5. To run only API tests:
   ```bash
   npx playwright test api/
   ```

### Configuration
- **playwright.config.js**: Contains environment configurations, such as browser types and base URL.
- **Environment Variables**: If needed, you can set up environment variables in a `.env` file for API keys or other sensitive data.

## Reporting
Playwright generates HTML reports that can be accessed after test execution. Simply run:
```bash
npx playwright show-report
```

## Additional Notes
- This suite supports both **cross-browser testing** (Chromium, WebKit, and Firefox) and **API testing** using Playwright’s APIRequestContext.
- Ensure the testing environment is configured to match the project requirements (staging, production, etc.).

## Contributions
Feel free to contribute by opening issues or submitting pull requests.

## Authors and acknowledgment
Mohamad Hasanien
