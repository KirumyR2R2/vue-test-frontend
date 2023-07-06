import gql from "graphql-tag";
import { USER_FRAGMENT } from "../fragments.js";

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      error
      ok
      user {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;
