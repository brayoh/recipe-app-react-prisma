module.exports = {
        typeDefs: /* GraphQL */ `type AggregateRecipe {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createRecipe(data: RecipeCreateInput!): Recipe!
  updateRecipe(data: RecipeUpdateInput!, where: RecipeWhereUniqueInput!): Recipe
  updateManyRecipes(data: RecipeUpdateManyMutationInput!, where: RecipeWhereInput): BatchPayload!
  upsertRecipe(where: RecipeWhereUniqueInput!, create: RecipeCreateInput!, update: RecipeUpdateInput!): Recipe!
  deleteRecipe(where: RecipeWhereUniqueInput!): Recipe
  deleteManyRecipes(where: RecipeWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  recipe(where: RecipeWhereUniqueInput!): Recipe
  recipes(where: RecipeWhereInput, orderBy: RecipeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Recipe]!
  recipesConnection(where: RecipeWhereInput, orderBy: RecipeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RecipeConnection!
  node(id: ID!): Node
}

type Recipe {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  ingredients: String!
  directions: String!
  published: Boolean!
}

type RecipeConnection {
  pageInfo: PageInfo!
  edges: [RecipeEdge]!
  aggregate: AggregateRecipe!
}

input RecipeCreateInput {
  title: String!
  ingredients: String!
  directions: String!
  published: Boolean
}

type RecipeEdge {
  node: Recipe!
  cursor: String!
}

enum RecipeOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  title_ASC
  title_DESC
  ingredients_ASC
  ingredients_DESC
  directions_ASC
  directions_DESC
  published_ASC
  published_DESC
}

type RecipePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  ingredients: String!
  directions: String!
  published: Boolean!
}

type RecipeSubscriptionPayload {
  mutation: MutationType!
  node: Recipe
  updatedFields: [String!]
  previousValues: RecipePreviousValues
}

input RecipeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RecipeWhereInput
  AND: [RecipeSubscriptionWhereInput!]
  OR: [RecipeSubscriptionWhereInput!]
  NOT: [RecipeSubscriptionWhereInput!]
}

input RecipeUpdateInput {
  title: String
  ingredients: String
  directions: String
  published: Boolean
}

input RecipeUpdateManyMutationInput {
  title: String
  ingredients: String
  directions: String
  published: Boolean
}

input RecipeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  ingredients: String
  ingredients_not: String
  ingredients_in: [String!]
  ingredients_not_in: [String!]
  ingredients_lt: String
  ingredients_lte: String
  ingredients_gt: String
  ingredients_gte: String
  ingredients_contains: String
  ingredients_not_contains: String
  ingredients_starts_with: String
  ingredients_not_starts_with: String
  ingredients_ends_with: String
  ingredients_not_ends_with: String
  directions: String
  directions_not: String
  directions_in: [String!]
  directions_not_in: [String!]
  directions_lt: String
  directions_lte: String
  directions_gt: String
  directions_gte: String
  directions_contains: String
  directions_not_contains: String
  directions_starts_with: String
  directions_not_starts_with: String
  directions_ends_with: String
  directions_not_ends_with: String
  published: Boolean
  published_not: Boolean
  AND: [RecipeWhereInput!]
  OR: [RecipeWhereInput!]
  NOT: [RecipeWhereInput!]
}

input RecipeWhereUniqueInput {
  id: ID
  title: String
}

type Subscription {
  recipe(where: RecipeSubscriptionWhereInput): RecipeSubscriptionPayload
}
`
      }
    