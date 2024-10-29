import query_db from './abstractions/db_abstraction';
import { models } from '../entities/index';


export const get_config = async (key: string): Promise<any> => {
    const fetch_config = await query_db(models.Config).find_one({
        key
    });

    if (!fetch_config) throw new Error('no config found');

    let data = fetch_config.data;
    if (typeof data === 'string') data = JSON.parse(fetch_config.data);

    return  data;
}