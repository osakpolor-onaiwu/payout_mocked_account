import { Object_type } from '../../utils/types_and_interfaces/types';
import { models } from '../../entities/index';
import query_db from '../../utils/abstractions/db_abstraction';
import { Bad_request_error, Custom_error } from '../../utils/errors';
import { encode_cursor, decode_cursor } from '../../utils/format_cursor';
import { Between , Or} from "typeorm";

interface DateFilter{
    created_at?: object;
}
const fetch_balance = async (data: Object_type): Promise<object> => {
    try {
        const { f4b_account_id, from, to, next_cursor: serialized_next_cursor, prev_cursor: serialized_previous_cursor, id, limit } = data;
        const next_cursor = decode_cursor(serialized_next_cursor);
        const previous_cursor = decode_cursor(serialized_previous_cursor);

        const date_filter:DateFilter = {};
        if (from) {
            date_filter.created_at = Between(from, to);
        };

        return {
            
        }
    } catch (error: any) {
        throw new Custom_error(error.message, 400);
    }
}


export default fetch_balance;