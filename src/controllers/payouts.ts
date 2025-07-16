import { Request, Response } from 'express';
import { Payout } from '../modules/payouts.entity'; // Adjust path as needed
import { createTransaction } from '../external/transactions';
import { User } from '../modules/user.entity'; // Adjust path as needed
import { getORM } from '../orm';


export const createPayout = async (req: Request, res: Response): Promise<void> => {
  const { currency, amount, userId } = req.body;
    const orm = getORM(); // Get the shared instance
  if (!currency || !amount || !userId) {
    res.status(400).json({ error: 'Insufficient data to create payout' });
    return;
  }
  
  const transaction = createTransaction(userId, amount);
  if (!transaction) {
    res.status(500).json({ error: 'Failed to create transaction' });
    return;
  }
  
  const transactionId = transaction.id;
  
  try {
    const em = orm.em.fork(); 
    const user = await em.findOneOrFail(User, { id: userId });
    const newPayout = em.create(Payout, {
        currency, amount, transactionId, user,
        createdAt: '',
        updatedAt: ''
    });
    await em.persistAndFlush(newPayout);
    
    res.status(201).json(newPayout);
  } catch (error) {
    console.error('Error creating payout:', error);
    res.status(500).json({ error: 'Failed to create payout' });
  }
};

export const getPayouts = async (req: Request, res: Response): Promise<void> => {
    try {
        const orm = getORM(); // Get the shared instance
        const em = orm.em.fork();
        const payouts = await em.find(Payout, {});
        res.status(200).json(payouts);
    } catch (error) {
        console.error('Error getting payouts:', error);
        res.status(500).json({ error: 'Failed to get payouts' });
}}

// export const getPayoutById = async (req: Request, res: Response, orm: MikroORM): Promise<void> => {
//   const { id } = req.params;
  
//   if (!id) {
//     res.status(400).json({ error: 'ID is required' });
//     return;
//   }
  
//   try {
//     const em = orm.em.fork();
//     const payout = await em.findOne(Payout, { id: parseInt(id) });
    
//     if (!payout) {
//       res.status(404).json({ error: 'Payout not found' });
//       return;
//     }
    
//     res.status(200).json(payout);
//   } catch (error) {
//     console.error('Error getting payout:', error);
//     res.status(500).json({ error: 'Failed to get payout' });
//   }
// };

// export const getPayoutByUserId = async (req: Request, res: Response, orm: MikroORM): Promise<void> => {
//   const { userId } = req.params;
  
//   if (!userId) {
//     res.status(400).json({ error: 'User ID is required' });
//     return;
//   }
  
//   try {
//     const em = orm.em.fork();
//     const payouts = await em.find(Payout, { userId });
    
//     if (!payouts || payouts.length === 0) {
//       res.status(404).json({ error: 'Payouts not found for this user' });
//       return;
//     }
    
//     res.status(200).json(payouts);
//   } catch (error) {
//     console.error('Error getting payouts:', error);
//     res.status(500).json({ error: 'Failed to get payouts' });
//   }
// };

// export const getPayoutByTransactionId = async (req: Request, res: Response, orm: MikroORM): Promise<void> => {
//   const { transactionId } = req.params;
  
//   if (!transactionId) {
//     res.status(400).json({ error: 'Transaction ID is required' });
//     return;
//   }
  
//   try {
//     const em = orm.em.fork();
//     const payout = await em.findOne(Payout, { transactionId });
    
//     if (!payout) {
//       res.status(404).json({ error: 'Payout not found' });
//       return;
//     }
    
//     res.status(200).json(payout);
//   } catch (error) {
//     console.error('Error getting payout:', error);
//     res.status(500).json({ error: 'Failed to get payout' });
//   }
// };