import { v4 as uuidv4 } from 'uuid';

const DEFAULT_DATE = "2023-03-14T00:00:00Z";

export enum TransactionType {
    PAYOUT = "payout",
    SPENT = "spent",
    EARNED = "earned"
  }

export type Transaction = {
    id: string;
    userId: string;
    type: TransactionType;
    amount: number;
    createdAt: string;
}

export const createTransaction = (userId: string, amount: number): Transaction => {    
    return {
        id: uuidv4(),
        userId,
        type: TransactionType.PAYOUT,
        amount,
        createdAt: DEFAULT_DATE
    }
}

export const getTransactionsByUserId = (userId: string): Transaction[] => {    
    const allTransactions  = getAllTransaction(userId);
    return allTransactions.filter(transaction => transaction.userId === userId) as Transaction[];
}

const getTransactionsByUserIdAndDate = (userId: string, startDate: Date, endDate: Date): Transaction[] => {
    const allTransactions  = getAllTransaction(userId);
    return allTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= startDate && transactionDate <= endDate;
    }) as  Transaction[];
}

const getAllTransaction = (userId:string) => {
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
          
    ]
}
