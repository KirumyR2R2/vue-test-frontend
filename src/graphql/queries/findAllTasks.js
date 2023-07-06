import gql from "graphql-tag";
import { TASK_FRAGMENT } from "../fragments.js";

export const FIND_ALL_TASKS_QUERY = gql`
  query {
    findAllTasks(input: { keyword: "" }) {
      error
      ok
      tasks {
        ...TaskParts
      }
    }
  }
  ${TASK_FRAGMENT}
`;
