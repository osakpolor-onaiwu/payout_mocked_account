//user model and key model
import md5 from 'md5';
import { Object_type } from '../../utils/types_and_interfaces/types';
import { Custom_error } from '../../utils/errors';
import { hash_secret_key } from '../../utils/hash_sec_keys';
import { v4 as uuidv4 } from 'uuid';
import { models } from '../../entities/index';
import query_db from '../../utils/abstractions/db_abstraction';

const merchant_keys = async (data: Object_type): Promise<object> => {
    try {
        const { f4b_account_id, key_name } = data;
        const prefix = process.env.ENVIROMENT !== 'production' ? "_TEST" : "-";
        const secret_key = "PMB_SECK" + prefix + md5(f4b_account_id + 'JP908' + new Date().getTime()) + "-M";
        const public_key = "PMB_PUBL" + prefix + md5(f4b_account_id + 'JP908' + new Date().getTime()) + "-M";
        const generated_key_name = key_name || 'PMV-KEY' + md5(Date.now() + "%0%");

        const hash_key = hash_secret_key(secret_key);
        const payload = {
            key_name: generated_key_name,
            secret_key: hash_key,
            accounts_table_id: f4b_account_id,
            uuid: uuidv4(),
            meta : {
                public_key
            }
        }

        const save_key = await query_db(models.secret_key).create(payload);

        return save_key;
    } catch (error: any) {
        throw new Custom_error(error.message, 400);
    }
}

export default merchant_keys;