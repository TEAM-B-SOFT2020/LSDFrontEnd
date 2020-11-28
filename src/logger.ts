import { createLogger, format, transports } from 'winston';

const { label, combine, timestamp , prettyPrint, json } = format;
var logger = createLogger({
  format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json(),
        prettyPrint(),
      ),
  transports: [
    new transports.Console(),
    new transports.File({filename: './logs/error.log' , level: 'error'  }),
    new transports.File({ filename: './logs/info.log' , level: 'info'  }),
  ],
  exitOnError: false,
});

export default logger;