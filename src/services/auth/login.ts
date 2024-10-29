import { Object_type } from '../../utils/types_and_interfaces/types';
import { models } from '../../entities/index';
import query_db from '../../utils/abstractions/db_abstraction';
import { Bad_request_error, Custom_error } from '../../utils/errors';
import { compare } from 'bcrypt';
import { generate_token } from '../../utils/generate_token';
import { Account } from '../../entities/accounts';

export interface Login {
    token: string;
    user: object;
}

const login = async (data: Object_type): Promise<Login> => {
    try {
        const { f4b_account_id, ip_address, user_agent, password } = data;
        const user = await query_db(models.Account).find_one({
            f4b_account_id
        });

        if (!user) throw new Bad_request_error('user not found');
        const compare_password = await compare(password, user.password);
        if (!compare_password) throw new Bad_request_error('Invalid credentials');

        const token = await generate_token(user as Account);
        delete user.password;
        delete user.deleted_at;

        return {
            token,
            user
        }
    } catch (error: any) {
        throw new Custom_error(error.message, 400);
    }
}


export default login;