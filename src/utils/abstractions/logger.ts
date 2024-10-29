import pino from "pino";

const log_data = pino({
    nestedKey: 'log'
})


class Pino_log_data {
    info(data: object, key: string) {
        log_data['info'](data, key)
    }

    error(data: object, key: string) {
        log_data['error'](data, key)
    }

    warning(data: object, key: string) {
        log_data['warn'](data, key)
    }
}



export const logger = new Pino_log_data();

