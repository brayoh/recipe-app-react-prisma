import { gql } from 'apollo-boost';

export default gql`
  mutation AddRecipe(
    $name: String!
    $title: String!
    $text: String!
    $published: Boolean
  ) {
    createRecipe(
      data: { name: $name, title: $title, text: $text, published: $published }
    ) {
      id
    }
  }
`;
