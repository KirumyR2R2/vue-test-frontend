import gql from "graphql-tag";
import { USER_FRAGMENT } from "../fragments";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      error
      ok
      user {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;
