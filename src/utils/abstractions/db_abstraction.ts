import { db_config } from '../../configs/db_config';
import { ObjectLiteral } from 'typeorm';


interface Options {
    skip?: number,
    take?: number,
    order?: object,
    relation?: object
}
const abstraction = (entity: any) => {
    const repo = db_config.getRepository(entity);
    const create = async <T>(data: object) => {
        try {
            const created_entry = repo.create(data!)
            return await repo.save(created_entry);
        } catch (error) {
            throw error;
        }
    }

    //calln new Entity before using this method
    const save = async (data: object) => {
        try {
            return await repo.save(data);
        } catch (error) {
            throw error;
        }
    }
    //count

    const soft_delete = async (data: object) => {
        const deleted = await repo.softRemove(data);
        return deleted;
    }

    //update_many
    const update = async (data: object, filter: object) => {
        const updated_data = await repo.update(filter, data);
        return updated_data;
    }


    const find_one = async (data: object, projection?: object, option?: Options) => {
        const find_data = await repo.findOne({
            where: {
                ...data
            },
            select: { ...projection },
            order: option?.order,
            relations: option?.relation
        });

        return find_data;
    }


    const find_many = async (data: object, projection?: object, option?: Options) => {
        const find_data = await repo.find({
            where: {
                ...data
            },
            select: { ...projection },
            take: option?.take || Number(process.env.LIMIT) || 10,
            skip: option?.skip,
            relations: option?.relation
        });

        return find_data;
    }

    return {
        find_many,
        find_one,
        update,
        soft_delete,
        create,
        save
    }
}

export default abstraction;