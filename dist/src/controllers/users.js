"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const orm_1 = require("../orm");
const user_entity_1 = require("../modules/user.entity"); // Adjust path as neededimport {getTransactionsByUserId} from '../external/transactions';
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orm = (0, orm_1.getORM)(); // Get the shared instance
        const em = orm.em.fork();
        const users = yield em.find(user_entity_1.User, {});
        console.log('resutls', users);
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Failed to get users' });
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const orm = (0, orm_1.getORM)(); // Get the shared instance
        if (!name || !email) {
            res.status(400).json({ error: 'Name and email are required' });
            return;
        }
        const em = orm.em.fork();
        const newUser = em.create(user_entity_1.User, {
            name, email
        });
        yield em.persistAndFlush(newUser);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});
exports.createUser = createUser;
// export const getUserBalance = async (req: Request, res: Response): Promise<any> => {
//   //assuming balance = earned - spent - payouts
//   const balance = calculateUserBalance(req.params.userId);
//   return res.status(200).json({ balance });
// }
// export const calculateUserBalance =  (userId: string): any => {
//   const userTransactions = getTransactionsByUserId(userId);
//   const totalEarned = userTransactions.filter(transaction => transaction.type === 'earned')
//     .reduce((acc, transaction) => acc + transaction.amount, 0);
//   const totalSpent = userTransactions.filter(transaction => transaction.type === 'spent')
//     .reduce((acc, transaction) => acc + transaction.amount, 0);
//   const totalPayouts = userTransactions.filter(transaction => transaction.type === 'payout')
//     .reduce((acc, transaction) => acc + transaction.amount, 0);
//   const balance = totalEarned - totalSpent - totalPayouts;
//   return balance;
// }
