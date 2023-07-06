import gql from "graphql-tag";

export const REMOVE_TASK_MUTATION = gql`
  mutation removeTask($input: RemoveTaskInput!) {
    removeTask(input: $input) {
      error
      ok
    }
  }
`;
