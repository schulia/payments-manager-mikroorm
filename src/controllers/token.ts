import { Payout } from "../modules/payouts.entity";
import { User } from "../modules/user.entity";
import { getORM } from '../orm';
import { OcpiTokens } from "../modules/ocpitoken.entity"; // Adjust path as needed
import { Request, Response } from 'express';
import { SqlEntityManager } from '@mikro-orm/sqlite';

const getPayouts = async (id: string): Promise<Payout[]> => {
    const orm = getORM(); // Get the shared instance
    const em = orm.em.fork();
    const payouts = await em.find(Payout, { id });
  return payouts;
}

const getUsers = async (id:string ): Promise<User[]> => {
    const orm = getORM(); // Get the shared instance
    const em = orm.em.fork();  
    const users = orm.em.find(User, {});
    return users;
}       

export const getOcpiTokens = async (req: Request, res: Response): Promise<void> => {
    const {id}  = req.params; // Assuming id is passed as a route parameter
    const numericId = parseInt(id);
    const orm = getORM(); // Get the shared instance
    const em = orm.em.fork() as SqlEntityManager;
    const token = await em.createQueryBuilder(OcpiTokens).select('*').where({ id: numericId });
    console.log('token', token);
    const tokens = await em.find(OcpiTokens, { id: numericId });
    res.status(200).json(tokens);
}   

export const getOcpiTokensByUserEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.params; 
    //select * from ocpi_tokens ot left join users u on ot.auth_id = u.email

    const orm = getORM(); // Get the shared instance
    const em = orm.em.fork() as SqlEntityManager;

    const qb =  em.createQueryBuilder(OcpiTokens, 'ot');
  const tokens = await qb
  .select(['ot.*', 'u.*'])
  .join('users', 'u', { 'ot.auth_id': { $eq: { 'u.email': true } } })
  .where({ 'u.email': email })
  .getResult();
    res.status(200).json(tokens);
}