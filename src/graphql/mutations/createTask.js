import gql from "graphql-tag";
import { TASK_FRAGMENT } from "../fragments.js";

export const CREATE_TASK_MUTATION = gql`
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      error
      ok
      task {
        ...TaskParts
      }
    }
  }
  ${TASK_FRAGMENT}
`;
