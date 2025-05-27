const API_ROUTES = {
  USERS: "/users",
  CREATE_USER: `/users`,

  USER_TASKS: (userId: string | number) => `/users/${userId}/tasks`,
  CREATE_TASK: (userId: string | number) => `/users/${userId}/tasks`,
  FILTER_TASKS: (userId: string | number) => `/users/${userId}/filterTasks`,
  TASK_BY_ID: (taskId: string) => `/tasks/${taskId}`,
};

export default API_ROUTES;
