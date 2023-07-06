import gql from "graphql-tag";

export const TASK_FRAGMENT = gql`
  fragment TaskParts on Task {
    id
    taskTitle
    taskBody
    taskStatus
    task_from
    task_to
    created_at
    updated_at
    taskUserId
    taskUser {
      username
    }
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    username
    created_at
    updated_at
    tasks {
      ...TaskParts
    }
  }
  ${TASK_FRAGMENT}
`;
