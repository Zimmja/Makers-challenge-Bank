## Introduction

As part of the Week 10 technical test at Makers Academy, I was challenged to create a simple programme with the following specification:

**Requirements:**

- You should be able to interact with your code via a REPL like IRB or the JavaScript console. (You don't need to implement a command line interface that takes input from STDIN.)
- Deposits, withdrawal.
- Account statement (date, amount, balance) printing.
- Data can be kept in memory (it doesn't need to be stored to a database or anything).

**Acceptance criteria:**

Given a client makes a deposit of 1000 on 10-01-2023
And a deposit of 2000 on 13-01-2023
And a withdrawal of 500 on 14-01-2023
When she prints her bank statement
Then she would see

```
date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00
```

The main goal of this week was to work alone, practice OO design and TDD skills, submit code for review and refine code based on feedback.

I was allowed to choose between Ruby and JavaScript to complete this challenge; I chose JavaScript.

## Interaction

To use this code on your machine:

1. Download the contents of this repo to a local repository
2. Check node and npm are installed with `node -v` and `npm -v` ; if not, install
3. If you want to test with Jest, install Jest with `npm install jest` and run `jest` in the console from the root directory (/Bank)
4. To use in Node:
   - Open Node.js with `node`
   - Require the account.js file: `const Account = require("./account.js")`
   - Create a new account: `const myAccount = new Account`
   - To make a deposit of e.g. £10.52, enter: `myAccount.deposit(10.52)`
   - To make a withdrawal of e.g. £5.00, enter: `myAccount.withdraw(5)`
   - To view a statement, enter: `myAccount.statement()`

## Setup and Technologies used

I began the project with the following steps:

1. Initiated npm with `npm -y init`
2. Installed Jest with `npm install jest`
3. Added a .gitignore file and placed node_modules inside it
4. Created bank.js and bank.test.js files, then constructed a simple Jest test to confirm repo was working correctly
5. Inserted the following at line 3 of the package.json file to show coverage on Jest tests:

```
"jest": {
    "collectCoverage": true
  },
```

## Planning

Based on the specification, I created the following user stories:

```
As a customer,
So I can store my money,
I want to deposit money into my account.

As a customer,
So I can use my money,
I want to be able to withdraw money from my account.

As a customer,
So I can check all interactions with my account,
I want to be able to view a statement of deposit / withdral history with timestamps for the account.

As a customer,
So I can track how much money I have,
I want to see a balance displayed with my deposit / withdrawal history in my statements.
```

I decided I would need the following objects to fulfill these stories:

1. A **Transaction** object

   - Initiated with a timestamp, account balance at time of creation, transaction amount and a boolean denoting credit or debit
   - Function to calculate the new balance when transaction amount is applied
   - Function to extract all properties, to be read in the Statement object

2. A **Statement** object

   - Initiated with an array of transactions (taken from Account)
   - Function prints a statement to the console

3. An **Account** object

   - Stores an account balance and a list of transactions
   - Functions to withdraw and desposit (i.e. create a new transaction object and amend properties accordingly)
   - Function to view a transaction history (i.e. create and view a new Statement object)

## Process

I created the Transaction class first, followed by the Statement and Account classes. I used a TDD approach through, using Jest to test my classes. In each case, I used mocking to isolate tests and freeze variable inputs (e.g. date). I tried to minimise the impact of allowing objects to be mocked into functions by creating test-specific functions to check tests are running (see the bottom of account.js).

Once all tests were passing, I used Node.js to test for edge cases, and amended the code where I found errors.
