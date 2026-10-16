import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import HomeController from './src/controllers/HomeController.js';
import LinkRepository from './src/models/LinkRepository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const repository = new LinkRepository(path.join(__dirname, 'data', 'links.json'));
const homeController = new HomeController(repository);

app.get('/', (req, res) => homeController.index(req, res));
app.post('/links/:id/delete', (req, res) => homeController.delete(req, res));

app.listen(port, () => {
  console.log(`SportHub News running at http://localhost:${port}`);
});
