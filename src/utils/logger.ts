import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  prettyPrint: true,
  timestamp: () => dayjs().format('YYYY-MM-DD HH:mm:ss'),
});

export default log;
