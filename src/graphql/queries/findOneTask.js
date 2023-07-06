import gql from "graphql-tag";
import { TASK_FRAGMENT } from "../fragments.js";

export const FIND_ONE_TASK_QUERY = gql`
  query findOneTaskQuery($id: Int!) {
    findOneTask(input: { id: $id }) {
      error
      ok
      task {
        ...TaskParts
      }
    }
  }
  ${TASK_FRAGMENT}
`;
