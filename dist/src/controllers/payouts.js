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
exports.getPayouts = exports.createPayout = void 0;
const payouts_entity_1 = require("../modules/payouts.entity"); // Adjust path as needed
const transactions_1 = require("../external/transactions");
const user_entity_1 = require("../modules/user.entity"); // Adjust path as needed
const orm_1 = require("../orm");
const createPayout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currency, amount, userId } = req.body;
    const orm = (0, orm_1.getORM)(); // Get the shared instance
    if (!currency || !amount || !userId) {
        res.status(400).json({ error: 'Insufficient data to create payout' });
        return;
    }
    const transaction = (0, transactions_1.createTransaction)(userId, amount);
    if (!transaction) {
        res.status(500).json({ error: 'Failed to create transaction' });
        return;
    }
    const transactionId = transaction.id;
    try {
        const em = orm.em.fork();
        const user = yield em.findOneOrFail(user_entity_1.User, { id: userId });
        const newPayout = em.create(payouts_entity_1.Payout, {
            currency, amount, transactionId, user
        });
        yield em.persistAndFlush(newPayout);
        res.status(201).json(newPayout);
    }
    catch (error) {
        console.error('Error creating payout:', error);
        res.status(500).json({ error: 'Failed to create payout' });
    }
});
exports.createPayout = createPayout;
const getPayouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orm = (0, orm_1.getORM)(); // Get the shared instance
        const em = orm.em.fork();
        const payouts = yield em.find(payouts_entity_1.Payout, {});
        res.status(200).json(payouts);
    }
    catch (error) {
        console.error('Error getting payouts:', error);
        res.status(500).json({ error: 'Failed to get payouts' });
    }
});
exports.getPayouts = getPayouts;
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
