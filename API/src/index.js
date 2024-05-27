import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import {
  getAllPosts, getPostById, deletePostById, updatePostById, addPost,
} from './database.js';

const swaggerDocument = YAML.load('swagger.yaml');

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

app.use(express.json());

app.get('/posts', async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const post = await getPostById(req.params.id);
  res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
  const result = await deletePostById(req.params.id);
  res.json(result);
});

app.put('/posts/:id', async (req, res) => {
  const result = await updatePostById(
    req.params.id,
    req.body.titulo,
    req.body.descripcion,
    req.body.imagen,
    req.body.autor,
  );
  res.json(result);
});

app.post('/posts', async (req, res) => {
  const result = await addPost(
    req.body.titulo,
    req.body.descripcion,
    req.body.imagen,
    req.body.autor,
  );
  res.json(result);
});

app.listen(22907, () => {
  console.log('Server is running on port 22907');
});
