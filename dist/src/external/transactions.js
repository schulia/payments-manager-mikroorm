"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsByUserId = exports.createTransaction = exports.TransactionType = void 0;
const uuid_1 = require("uuid");
const DEFAULT_DATE = "2023-03-14T00:00:00Z";
var TransactionType;
(function (TransactionType) {
    TransactionType["PAYOUT"] = "payout";
    TransactionType["SPENT"] = "spent";
    TransactionType["EARNED"] = "earned";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
const createTransaction = (userId, amount) => {
    return {
        id: (0, uuid_1.v4)(),
        userId,
        type: TransactionType.PAYOUT,
        amount,
        createdAt: DEFAULT_DATE
    };
};
exports.createTransaction = createTransaction;
const getTransactionsByUserId = (userId) => {
    const allTransactions = getAllTransaction(userId);
    return allTransactions.filter(transaction => transaction.userId === userId);
};
exports.getTransactionsByUserId = getTransactionsByUserId;
const getTransactionsByUserIdAndDate = (userId, startDate, endDate) => {
    const allTransactions = getAllTransaction(userId);
    return allTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= startDate && transactionDate <= endDate;
    });
};
const getAllTransaction = (userId) => {
    return [
        {
            "id": "41bbdf81-735c-4aea-beb3-3e5f433a30c5",
            userId,
            "createdAt": "2023-03-16T12:33:11.000Z",
            "type": "payout",
            "amount": 13
        },
        {
            "id": "78cde492-81af-4b16-9ec5-29876fa45d12",
            "userId": userId,
            "createdAt": "2023-04-02T09:15:23.000Z",
            "type": "payout",
            "amount": 45.50
        },
        {
            "id": "41bbdf81-735c-4aea-beb3-3e5fasfsdfef",
            userId,
            "createdAt": "2023-03-12T12:33:11.000Z",
            "type": "spent",
            "amount": 12
        },
        {
            "id": "92aef715-c6bd-4f1a-8d23-5e782bcf3a19",
            "userId": userId,
            "createdAt": "2023-03-25T16:42:08.000Z",
            "type": "spent",
            "amount": 19.50
        },
        {
            "id": "41bbdf81-735c-4aea-beb3-342jhj234nj234",
            userId,
            "createdAt": "2023-03-15T12:33:11.000Z",
            "type": "earned",
            "amount": 100.00
        },
        {
            "id": "63bac541-2e7d-48a9-bc31-4f8de2a768ec",
            "userId": "56efg321-908h-7i65-4j32-1k098lm765n4",
            "createdAt": "2023-03-28T10:20:47.000Z",
            "type": "earned",
            "amount": 30.75
        }
    ];
};
