import bunyan from 'bunyan';

const logger = (name: string) =>
  bunyan.createLogger({
    name,
    level: 'info'
  });

export default logger;
