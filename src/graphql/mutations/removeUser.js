import gql from "graphql-tag";

export const REMOVE_USER_MUTATION = gql`
  mutation removeUser($input: RemoveUserInput!) {
    removeUser(input: $input) {
      error
      ok
    }
  }
`;
