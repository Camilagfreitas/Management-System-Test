const API_ROUTES = {
  LOGIN: "/auth/login",
  USERS: "/users",
  CREATE_USER: `/users`,
  GET_TASKS: (userId: string | number) => `/tasks/users/${userId}`,
  CREATE_TASK: `/tasks`,
  TASK_BY_ID: (taskId: string) => `/tasks/${taskId}`,
};

export default API_ROUTES;
