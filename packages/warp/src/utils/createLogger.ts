import winston from 'winston';

export let createLogger = () => {
  let logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple())
      })
    ]
  });

  return logger;
};
