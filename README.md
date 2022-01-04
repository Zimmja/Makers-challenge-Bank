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

## Setup

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
