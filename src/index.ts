import { app } from './app';
import { createServer } from 'http';
import { logger } from './utils/abstractions/logger';
import { app_configuration } from './configs/app_config';
const server = createServer(app);


server.listen(app_configuration.port, () => {
    logger.info({message:`server listening on port ${app_configuration.port}`},'server started')
})

const close_server = () => {
    server.close((e: any) => {
        logger.error(e, 'Server closed')
        process.exit(0);
    });
}

process.on('SIGINT', close_server);
process.on('SIGTERM', close_server);

server.on('error', (err: any) => {
    switch (err.code) {
        case "EADDRINUSE":
            logger.error({ error: err.message }, 'EADDRINUSE')
            process.exit(1);
            break;
        default:
            logger.error({ error: err.message }, 'APP-ERROR')
    }
}
);
