import { gql } from 'apollo-boost';

export default gql`
  query GetSingleRecipe($recipeId: ID!) {
    recipe(where: { id: $recipeId }) {
      id
      createdAt
      title
      directions
      ingredients
      published
    }
  }
`;
