import gql from "graphql-tag";
import { TASK_FRAGMENT } from "../fragments.js";

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      error
      ok
      task {
        ...TaskParts
      }
    }
  }
  ${TASK_FRAGMENT}
`;
