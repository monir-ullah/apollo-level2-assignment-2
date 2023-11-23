import { connect } from 'mongoose';
import app from './app';
import config from './app/config';

async function serverStart() {
  try {
    await connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
serverStart();
