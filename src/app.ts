import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user.route';

const app: Application = express();

//Express parsers
app.use(express.json());
app.use(cors());

app.use('/api', UserRoutes);
app.get('/', (req, res) => {
  const body = req.body;

  res.status(200).send({
    success: true,
    message: 'Assignment',
    data: body,
  });
});

app.get('*', function (req, res) {
  res.status(404).json({
    success: false,
    message: 'You tried wrong url/api link. Please try again.',
    data: req.body,
  });
});

export default app;
