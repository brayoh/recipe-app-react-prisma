import { gql } from 'apollo-boost';

export default gql`
  query GetAllPublishedRecipes {
    recipes(where: { published: true }) {
      id
      createdAt
      title
      ingredients
      directions
      published
    }
  }
`;
