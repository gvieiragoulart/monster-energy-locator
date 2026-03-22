import express from 'express';
import path from 'node:path';
import { runMigrations } from './db/migrate.js';
import { seedIfEmpty } from './db/seed.js';
import locationRoutes from './routes/locationRoutes.js';

const app = express();
app.use(express.json());
app.use(locationRoutes);

// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  const publicPath = path.resolve(import.meta.dirname, 'public');
  app.use(express.static(publicPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// Init DB and start
runMigrations();
seedIfEmpty();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
