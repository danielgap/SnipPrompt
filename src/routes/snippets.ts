import { Router } from 'express';
import {
  countTags,
  createSnippet,
  deleteSnippet,
  getAllSnippets,
  getRawCode,
  getSnippet,
  searchSnippets,
  updateSnippet
} from '../controllers/snippets';
import { requireBody, requireAuth, optionalAuth } from '../middleware';

export const snippetRouter = Router();

snippetRouter
  .route('/')
  .post(requireAuth, requireBody('title', 'language', 'code'), createSnippet)
  .get(optionalAuth, getAllSnippets);

snippetRouter
  .route('/:id')
  .get(optionalAuth, getSnippet)
  .put(requireAuth, updateSnippet)
  .delete(requireAuth, deleteSnippet);

snippetRouter.route('/statistics/count').get(countTags);
snippetRouter.route('/raw/:id').get(optionalAuth, getRawCode);
snippetRouter.route('/search').post(optionalAuth, searchSnippets);