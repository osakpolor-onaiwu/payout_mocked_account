import { Object_type } from '../../utils/types_and_interfaces/types';
import { models } from '../../entities/index';
import query_db from '../../utils/abstractions/db_abstraction';
import { Bad_request_error, Custom_error } from '../../utils/errors';


const update_balance = async (data: Object_type): Promise<object> => {
    try {
        const { f4b_account_id, amount } = data;
        const [user_detail, bank_account_details] = await Promise.all([
            query_db(models.Account).find_one({
                f4b_account_id
            }),
            query_db(models.merchant_bank_details).find_one({
                f4b_account_id
            })
        ]);

        if(!user_detail) throw new Bad_request_error('User account details not found');
        if(!bank_account_details) throw new Bad_request_error('Bank account details not found for this account');

        //do update in merchant balance
        return {}
    } catch (error: any) {
        throw new Custom_error(error.message, 400);
    }
}


export default update_balance;