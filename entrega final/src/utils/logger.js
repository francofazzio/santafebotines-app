import winston from "winston"
const buildLogger = () => {
    const loggerWinston = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: "info"}),
            new winston.transports.File({ filename: "warn.log", level: "warn" }),
            new winston.transports.File({ filename: "error.log", level: "error" })
        ]
    })
    return loggerWinston
}

const logger = buildLogger()

export default logger