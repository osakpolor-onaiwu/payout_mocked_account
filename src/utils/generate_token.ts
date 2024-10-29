import { sign as sign_token } from 'jsonwebtoken';
import { Account } from '../entities/accounts';

export const generate_token = async (data: Account) => {
    try {
        const payload = {
            f4b_account_id:data?.f4b_account_id,
            parent_account_id:data?.parent_account_id,
            business_name:data?.business_name
        }
        const token = sign_token(payload, process.env.JWT_SECRET || 'dsdsdfd', {
            expiresIn: Number(process.env.JWT_EXPIRY) || Number(60 * 60)
        });

        return token;
    } catch (error:any) {
        throw error;
    }
}