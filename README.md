# apollo-level2-assignment-2

### Assignment 2 Done

[Assignment Github Link](https://github.com/monir-ullah/apollo-level2-assignment-2.git)

[Assignment Vercel Link](https://level-2-assignment-2-one.vercel.app/)

## Technology Used:

1.Typescript

2.MongoDB

3.Mongoose

### Validation Library

- Joi

## Features included:

- Create user
- Delete User
- Find User
- Order Product
- View Order List
- Calculate total price

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

### Calculating Total price from array

```typescript
// Calculate total price for user

let totalPrice = 0;
singleItemTotalPrice.forEach((price: number) => {
  totalPrice += price;
});

console.log(totalPrice);
```

### My Created Function

```typescript
// This function written from database oeration

createUserInDB();
getAllUsersFromMongoDB();
findSingleUser();
updateUserInfoInDB();
deleteOneFromDB();
productNewOrderIntoDB();
findOrderListORCalculateTotalfromDB();

// This function written to handle request and response

createUser();
getAllUsers();
findUserById();
updateUserInfo();
deleteUser();
newProductOder();
specificUserorderList();
specificUserTotalPrice();
```

### My Created Function

```typescript
// This function written from database oeration

createUserInDB();
getAllUsersFromMongoDB();
findSingleUser();
updateUserInfoInDB();
deleteOneFromDB();
productNewOrderIntoDB();
findOrderListORCalculateTotalfromDB();
```

### My Routes

```typescript
// my application routes

app.use('/api', UserRoutes);
app.get('/', (req, res) => {
  const body = req.body;

  res.status(200).send({
    status: 'sucess',
    message: 'Assignment',
    data: body,
  });
});

router.post('/users', UserControler.createUser);
router.get('/users', UserControler.getAllUsers);
router.get('/users/:userId', UserControler.findUserById);
router.put('/users/:userId', UserControler.updateUserInfo);
router.delete('/users/:userId', UserControler.deleteUser);
router.put('/users/:userId/orders', UserControler.newProductOder);
router.get('/users/:userId/orders', UserControler.specificUserorderList);
router.get(
  '/users/:userId/orders/total-price',
  UserControler.specificUserTotalPrice,
);
```

✅✅✅✅✅ I have completed the assignment ✅✅✅✅✅

❤❤❤❤❤❤❤ Thank you for visiting my github ❤❤❤❤❤❤❤
