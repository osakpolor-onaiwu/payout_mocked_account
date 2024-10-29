import { Object_type } from '../../utils/types_and_interfaces/types';
import { models } from '../../entities/index';
import query_db from '../../utils/abstractions/db_abstraction';
import { Bad_request_error, Custom_error } from '../../utils/errors';


const fetch_balance = async (data: Object_type): Promise<object> => {
    try {
        const { f4b_account_id } = data;
       console.log('fetched', f4b_account_id)
        //do update in merchant balance
        return {
            
        }
    } catch (error: any) {
        throw new Custom_error(error.message, 400);
    }
}


export default fetch_balance;