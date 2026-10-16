import fs from 'fs/promises';

class JsonDatabase {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async read() {
    const content = await fs.readFile(this.filePath, 'utf8');
    return JSON.parse(content);
  }

  async write(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}

export default JsonDatabase;
