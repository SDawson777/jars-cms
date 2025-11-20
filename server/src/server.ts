import 'dotenv/config'
import app from './index'
import {logger} from './lib/logger'

const PORT = Number(process.env.PORT || 4010)

app.listen(PORT, () => {
  logger.info('server.started', {port: PORT})
})

export default app
