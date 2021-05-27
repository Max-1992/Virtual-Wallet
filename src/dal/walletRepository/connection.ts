import { createPool } from 'mysql2/promise';

const connectDatabase = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'virtual_wallet',
    decimalNumbers: true
  });

export default connectDatabase;