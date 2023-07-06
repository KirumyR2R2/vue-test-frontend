import gql from "graphql-tag";
import { USER_FRAGMENT } from "../fragments";

export const FIND_ALL_USERS_QUERY = gql`
  query {
    findAllUsers(input: { keyword: "" }) {
      error
      ok
      users {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;
