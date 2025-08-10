// jars-cms/server.ts
import express from 'express';
import dotenv from 'dotenv';
import greenhouseRoutes from './routes/greenhouse';
import adminRoutes from './routes/admin'
app.use('/api', adminRoutes)

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4010;

app.use(express.json());
app.use('/api', greenhouseRoutes);

app.listen(PORT, () => {
  console.log(`📚 Jars CMS API running at http://localhost:${PORT}/api`);
});