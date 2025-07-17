import { Payout } from "../modules/payouts.entity";
import { User } from "../modules/user.entity";
import { getORM } from '../orm';
import { OcpiTokens } from "../modules/ocpitoken.entity"; // Adjust path as needed

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

const getOcpiTokens = async (id: number): Promise<OcpiTokens[]> => {
    const orm = getORM(); // Get the shared instance
    const em = orm.em.fork(); 
    const tokens = await em.find(OcpiTokens, { id });
    return tokens;
}   

