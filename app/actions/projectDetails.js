const createProject = (projectData) => ({
  type: 'CREATE_PROJECT',
  title: projectData.title,
  description: projectData.description,
  membersArray: projectData.members
});

const createTask = (taskData) => ({
  type: 'CREATE_TASK',
  projectKey: taskData.projectKey,
  taskTitle: taskData.title,
  taskDescription: taskData.description,
  taskStatus: taskData.status,
  nameId: taskData.nameId
});

const showCreateProjectDialog = () => ({
  type: 'SHOW_CREATE_PROJECT_DIALOG'
});

const showCreateTaskDialog = () => ({
  type: 'SHOW_CREATE_TASK_DIALOG'
});

const hideCreateProjectDialog = () => ({
  type: 'HIDE_CREATE_PROJECT_DIALOG'
});

const hideCreateTaskDialog = () => ({
  type: 'HIDE_CREATE_TASK_DIALOG'
});

const changeTaskStatus = (projectKey, nameId, taskId, newStatus) => ({
  type: 'CHANGE_TASK_STATUS',
  projectKey,
  nameId,
  status: newStatus,
  taskId
});

export default {
  createProject,
  createTask,
  changeTaskStatus,
  showCreateProjectDialog,
  showCreateTaskDialog,
  hideCreateProjectDialog,
  hideCreateTaskDialog
};
