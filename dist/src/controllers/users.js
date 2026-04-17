import { getORM } from '../orm.js';
import { User } from '../modules/user.entity.js';
import { getTransactionsByUserId } from '../external/transactions.js';
export const getUsers = async (req, res) => {
    try {
        const orm = getORM(); // Get the shared instance
        const em = orm.em.fork();
        const users = await em.find(User, {});
        console.log('resutls', users);
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Failed to get users' });
    }
};
export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const orm = getORM(); // Get the shared instance
        if (!name || !email) {
            res.status(400).json({ error: 'Name and email are required' });
            return;
        }
        const em = orm.em.fork();
        const newUser = em.create(User, {
            name, email, created_at: 'lLll', updated_at: 'Lll'
        });
        await em.persistAndFlush(newUser);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};
export const getUserBalance = async (req, res) => {
    //assuming balance = earned - spent - payouts
    const balance = calculateUserBalance(req.params.userId);
    return res.status(200).json({ balance });
};
export const calculateUserBalance = (userId) => {
    const userTransactions = getTransactionsByUserId(userId);
    const totalEarned = userTransactions.filter(transaction => transaction.type === 'earned')
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalSpent = userTransactions.filter(transaction => transaction.type === 'spent')
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalPayouts = userTransactions.filter(transaction => transaction.type === 'payout')
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const balance = totalEarned - totalSpent - totalPayouts;
    return balance;
};
