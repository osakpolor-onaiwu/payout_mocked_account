import { Object_type } from '../../utils/types_and_interfaces/types';
import { Custom_error, Bad_request_error } from '../../utils/errors';
import { models } from '../../entities/index';
import query_db from '../../utils/abstractions/db_abstraction';

const fetch_account_details = async (data: Object_type): Promise<object> => {
    try {
        const { f4b_account_id } = data;
        const fetched_details = await query_db(models.merchant_bank_details).find_one({
            f4b_account_id: f4b_account_id
        })

        if (!fetched_details) throw new Bad_request_error(`No bank details found for account id ${f4b_account_id}`)

        return fetched_details;
    } catch (error: any) {
        throw new Custom_error(error.message, 400);
    }
}

export default fetch_account_details;