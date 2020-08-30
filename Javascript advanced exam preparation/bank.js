class Bank {
  constructor(bankName) {
    this._bankName = bankName;
    this.allCustomers = [];
    this.transaction = {};
  }

  newCustomer(customer) {
    let alreadyCustomer = this.allCustomers.find(
      (e) => e.personalId === customer.personalId
    );
    if (alreadyCustomer) {
      throw new Error(
        `${customer.firstName} ${customer.lastName} is already our customer!`
      );
    }

    this.transaction[customer.personalId] = [];

    this.allCustomers.push({ ...customer, totalMoney: 0 });

    return customer;
  }

  depositMoney(personalId, amount) {
    let customer = this.allCustomers.find((e) => e.personalId === personalId);
    if (!customer) {
      throw new Error("We have no customer with this ID!");
    }

    customer.totalMoney += amount;
    let transaction = { amount, type: "deposit" };
    this.transaction[personalId].push(transaction);
    return `${customer.totalMoney}$`;
  }

  withdrawMoney(personalId, amount) {
    let customer = this.allCustomers.find((e) => e.personalId === personalId);
    if (!customer) {
      throw new Error("We have no customer with this ID!");
    }

    if (customer.totalMoney < amount) {
      throw new Error(
        `${customer.firstName} ${customer.lastName} does not have enough money to withdraw that amount!`
      );
    }

    customer.totalMoney -= amount;
    let transaction = { amount, type: "withdraw" };
    this.transaction[personalId].push(transaction);

    return `${customer.totalMoney}$`;
  }

  customerInfo(pid) {
    let customer = this.allCustomers.find((e) => e.personalId === pid);
    let result = [
      `Bank name: ${this._bankName}`,
      `Customer name: ${customer.firstName} ${customer.lastName}`,
      `Customer ID: ${pid}`,
      `Total Money: ${customer.totalMoney}$`,
      `Transactions:`,
    ];

    let counter = this.transaction[pid].length;

    let transaction = this.transaction[pid].reverse().map((e) => {
      let string = "";
      if (e.type === "deposit") {
        string = "made deposit of";
      } else {
        string = "withdrew";
      }

      return `${counter--}. ${customer.firstName} ${
        customer.lastName
      } ${string} ${e.amount}$!`;
    });

    return result.concat(transaction).join("\n");
  }
}
