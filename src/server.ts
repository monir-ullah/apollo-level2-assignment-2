/* eslint-disable @typescript-eslint/no-unused-vars */
import { connect } from 'mongoose';
import app from './app';
import config from './app/config';
import { MongoClient } from 'mongodb';

// This function is starting the server
async function serverStart() {
  try {
    await connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    return error;
  }
}
serverStart();

// this functin will create mongodb connectin and find specific user orders
export const mongoDbClientConnection = async (userId: unknown) => {
  const connectionUlr: string = String(config.database_url);
  const mongoDBClient = new MongoClient(connectionUlr);

  try {
    await mongoDBClient.connect();
    const result = await mongoDBClient
      .db('assignment2')
      .collection('users')
      .findOne({ userId }, { projection: { orders: true } });
    return result;
  } catch (error) {
    return 'Colud not connect with mongdobd';
  }
};
