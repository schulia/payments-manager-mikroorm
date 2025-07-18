import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import payoutRoutes from './routes/payouts';
import tokenRoutes from './routes/tokens';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/payouts', payoutRoutes);
app.use('/api/tokens', tokenRoutes);

app.get('/health', (req, res) => {
  res.json({ message: 'Healthcheck ok' });
});

export default app;