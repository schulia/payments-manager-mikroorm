import { Request, Response } from 'express';
import Payout  from '../models/payouts';
import {createTransaction} from '../external/transactions';

export const createPayout = async(req: Request, res:Response): Promise<void> => {
        const { currency, amount, userId } = req.body;
    
        if (!currency || !amount || !userId) {
            res.status(400).json({ error: 'Insufficient data to create payout' });
        }
        const transaction = createTransaction(userId, amount);

        if (!transaction) {
            res.status(500).json({ error: 'Failed to create transaction' });
        }
        const transactionId = transaction.id;
        const newPayout = await Payout.create({ currency, amount, transactionId, userId });
        res.status(201).json(newPayout);
   }

export const getPayoutById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ error: 'ID is required' });
    }
    try {
        const payout = await Payout.findByPk(id);
        if (!payout) {
            res.status(404).json({ error: 'Payout not found' });
        }
        res.status(200).json(payout);
    }
    catch (error) {
        console.error('Error getting payout:', error);
        res.status(500).json({ error: 'Failed to get payout' });
    }
}

export const getPayoutByUserId = async(req: Request, res:Response): Promise<void> => {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const payouts = await Payout.findAll({ where: { userId } });
        if (!payouts || payouts.length === 0) {
            res.status(404).json({ error: 'Payouts not found for this user' });
        }
        res.status(200).json(payouts);
    }
    catch (error) {
        console.error('Error getting payouts:', error);
        res.status(500).json({ error: 'Failed to get payouts' });
    }
}

export const getPayoutByTransactionId = async(req: Request, res:Response): Promise<void> => {
    const { transactionId } = req.params;
    if (!transactionId) {
        res.status(400).json({ error: 'Transaction ID is required' });
    }
    try {
        const payout = await Payout.findOne({ where: { transactionId } });
        if (!payout) {
            res.status(404).json({ error: 'Payout not found' });
        }
        res.status(200).json(payout);
    }
    catch (error) {
        console.error('Error getting payout:', error);
        res.status(500).json({ error: 'Failed to get payout' });
    }
}
