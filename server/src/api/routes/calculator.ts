import express from 'express';
import redisClient from '../../services/redisService';
import { calcExpression } from '../../services/math';

const router = express.Router();

const tenMinute = 600;

router.post('/', async function(req, res) {
  const { expression }: { expression: string } = req.body;

  // null validation
  if (!expression) return res.status(400).send({ msg: 'err_expression_required' });

  // Get the result from redis cache
  redisClient.get(expression, (err, result) => {
    if (result) {
      console.log('from cache');
      return res.status(200).send({ result });
    } else {
      // validation
      // if (!expression.match(/(\d+\s*(\*|\/|\+|\-)\s*)+(\d+\s*)/)) {
      //   return res.status(400).send({ msg: 'err_invalid_expression' });
      // }

      // Calculate
      const result = calcExpression(expression);

      // save in redis cache
      redisClient.setex(expression, tenMinute, result.toString());

      res.status(200).send({ result });
    }
  });
});

export default router;
