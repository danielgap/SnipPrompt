import { TagModel, SnippetModel, Snippet_TagModel, UserModel } from '../models';

export const associateModels = async () => {
  // Relaciones User-Snippet
  UserModel.hasMany(SnippetModel, {
    foreignKey: 'userId',
    as: 'snippets'
  });

  SnippetModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
  });

  // Relaciones Tag-Snippet (existentes)
  TagModel.belongsToMany(SnippetModel, {
    through: Snippet_TagModel,
    foreignKey: 'tag_id',
    as: 'snippets'
  });

  SnippetModel.belongsToMany(TagModel, {
    through: Snippet_TagModel,
    foreignKey: 'snippet_id',
    as: 'tags'
  });
};
