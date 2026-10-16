import JsonDatabase from '../db/JsonDatabase.js';
import Link from './Link.js';

class LinkRepository {
  constructor(dataFilePath) {
    this.database = new JsonDatabase(dataFilePath);
  }

  async getAll() {
    const rows = await this.database.read();
    return rows.map((row) => new Link(row));
  }

  async findByQuery(query = '') {
    const normalizedQuery = query.trim().toLowerCase();
    const rows = await this.getAll();

    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((link) => {
      return link.name.toLowerCase().includes(normalizedQuery) ||
        link.url.toLowerCase().includes(normalizedQuery) ||
        link.period.toLowerCase().includes(normalizedQuery);
    });
  }

  async deleteById(id) {
    const rows = await this.database.read();
    const rowIndex = rows.findIndex((row) => String(row.id) === String(id));

    if (rowIndex === -1) {
      return false;
    }

    rows.splice(rowIndex, 1);
    await this.database.write(rows);
    return true;
  }
}

export default LinkRepository;
