# apollo-level2-assignment-2

### Assignment 2 Done

## Technology Used:

1.Typescript
2.MongoDB
3.Mongoose

### Validation Library

- Joi

### Mongodb Database connection

```typescript
// This function will connect database and search specific user info

const mongoDbClientConnection = async (userId) => {
  const connectionUlr: string = String(config.database_url);
  const mongoDBClient = new MongoClient(connectionUlr);

  try {
    await mongoDBClient.connect();
    const result = await mongoDBClient
      .db('assignment2')
      .collection('users')
      .findOne({ userId }, { orders: true });
    return result;
  } catch (error) {
    return 'Colud not connect with mongdobd';
  }
};
```
