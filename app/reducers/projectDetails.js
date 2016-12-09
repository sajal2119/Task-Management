import objectAssign from 'object-assign';

let draggedTaskData = null;

const initialState = {
  isShowCreateProjectDialog: false,
  isShowCreateTaskDialog: false,
  employees: [
    {
      name: 'Abhinav Singhal',
      id: 'abhinav_singhal'
    },
    {
      name: 'Surbhi Gupta',
      id: 'surbhi_gupta'
    },
    {
      name: 'Pratibha Joshi',
      id: 'pratibha_joshi'
    },
    {
      name: 'Sonal Sharma',
      id: 'sonal_sharma'
    }
  ],
  taskStatuses: [
    {
      name: 'Done',
      key: 'done'
    },
    {
      name: 'On Hold',
      key: 'on_hold'
    },
    {
      name: 'In Process',
      key: 'in_process'
    },
    {
      name: 'Sent',
      key: 'sent'
    },
    {
      name: 'Schedule',
      key: 'schedule'
    }
  ],
  projects: [
    {
      title: 'Publishing',
      key: 'publishing',
      description: 'It is a module which helps you to post in multiple channels at once',
      members: [
        {
          nameId: 'abhinav_singhal',
          tasks: [
            {
              id: '101',
              title: 'Publishing View',
              description: 'Includes all channel previews',
              statuskey: 'done'
            }
          ]
        },
        {
          nameId: 'surbhi_gupta',
          tasks: [
            {
              id: '102',
              title: 'Icon Creation',
              description: 'Needed a new icon set',
              statuskey: 'on_hold'
            },
            {
              id: '104',
              title: 'Icon Updation',
              description: 'Needed old icon set',
              statuskey: 'in_process'
            }
          ]
        },
        {
          nameId: 'pratibha_joshi',
          tasks: [
            {
              id: '103',
              title: 'Publishing View',
              description: 'Includes all channel previews',
              statuskey: 'done'
            }
          ]
        }
      ]
    },
    {
      title: 'Engagement',
      key: 'engagement',
      description: 'It is a module which helps you to post in multiple channels at once',
      members: [
        {
          nameId: 'abhinav_singhal',
          tasks: [
            {
              id: '201',
              title: 'Publishing View',
              description: 'Includes all channel previews',
              statuskey: 'done'
            }
          ]
        },
        {
          nameId: 'surbhi_gupta',
          tasks: [
            {
              id: '202',
              title: 'Icon Creation',
              description: 'Needed a new icon set',
              statuskey: 'on_hold'
            }
          ]
        },
        {
          nameId: 'pratibha_joshi',
          tasks: [
            {
              id: '203',
              title: 'Publishing View',
              description: 'Includes all channel previews',
              statuskey: 'done'
            }
          ]
        }
      ]
    },
    {
      title: 'Paid',
      key: 'paid',
      description: 'It is a module which helps you to post in multiple channels at once',
      members: [
        {
          nameId: 'abhinav_singhal',
          tasks: [
            {
              id: '301',
              title: 'Publishing View',
              description: 'Includes all channel previews',
              statuskey: 'done'
            }
          ]
        },
        {
          nameId: 'surbhi_gupta',
          tasks: [
            {
              id: '302',
              title: 'Icon Creation',
              description: 'Needed a new icon set',
              statuskey: 'on_hold'
            }
          ]
        },
        {
          nameId: 'pratibha_joshi',
          tasks: [
            {
              id: '303',
              title: 'Publishing View',
              description: 'Includes all channel previews',
              statuskey: 'done'
            }
          ]
        }
      ]
    },
    {
      title: 'Core',
      key: 'core',
      description: 'It is a module which helps you to post in multiple channels at once',
      members: [
        {
          nameId: 'abhinav_singhal',
          tasks: [
            {
              id: '401',
              title: 'Publishing View',
              description: 'Includes all channel previews',
              statuskey: 'done'
            }
          ]
        },
        {
          nameId: 'surbhi_gupta',
          tasks: [
            {
              id: '402',
              title: 'Icon Creation',
              description: 'Needed a new icon set',
              statuskey: 'on_hold'
            }
          ]
        },
        {
          nameId: 'pratibha_joshi',
          tasks: [
            {
              id: '403',
              title: 'Publishing View',
              description: 'Includes all channel previews',
              statuskey: 'done'
            }
          ]
        }
      ]
    }
  ]
};

// Add member to the newly created project
const createMembersForNewProjectById = (membersArray) => {
  const formattedMembersArray = [];
  membersArray.map((memberItem) => {
    formattedMembersArray.push({
      nameId: memberItem,
      tasks: []
    });
    return false;
  });
  return formattedMembersArray;
};

// Update task on status change
const updateTaskOnUpdation = (task = [], action) => {
  if (task.id !== action.taskId) {
    return task;
  }
  return objectAssign({}, task, {
    statuskey: action.status
  });
};

// Update project member object on new task creation
const updateProjectMemberOnTaskCreation = (member = [], action) => {
  if (member.nameId !== action.nameId) {
    return member;
  }
  return objectAssign({}, member, {
    tasks: member.tasks.concat({
      title: action.taskTitle,
      description: action.taskDescription,
      statuskey: action.taskStatus,
      id: new Date().getTime()
    })
  });
};

// Update project member object on task switch
const updateProjectMemberOnTaskSwtich = (member = [], action) => {
  if (member.nameId !== action.draggedMemberId && member.nameId !== action.droppedMemberId) {
    return member;
  }
  // Remove task from the dragged member and store task details in static variable
  if (member.nameId === action.draggedMemberId) {
    draggedTaskData = member.tasks.filter((task) => (task.id === action.draggedTaskId))[0];
    return objectAssign({}, member, {
      tasks: member.tasks.filter((task) => (task.id !== action.draggedTaskId))
    });
  }
  // Add task to the dropped member
  return objectAssign({}, member, {
    tasks: member.tasks.concat(draggedTaskData)
  });
};


// Update project member object on task status change
const updateProjectMemberOnTaskUpdation = (member = [], action) => {
  if (member.nameId !== action.nameId) {
    return member;
  }
  return objectAssign({}, member, {
    tasks: member.tasks.map(task =>
      updateTaskOnUpdation(task, action)
    )
  });
};

// Update project object on task creation for a member
const updateProjectOnTaskCreation = (project = {}, action) => {
  if (project.key !== action.projectKey) {
    return project;
  }
  return objectAssign({}, project, {
    members: project.members.map(member =>
      updateProjectMemberOnTaskCreation(member, action)
    )
  });
};

// Update project object on task switch between members
const updateProjectOnTaskSwitch = (project = {}, action) => {
  draggedTaskData = null;
  if (project.key !== action.projectKey) {
    return project;
  }
  return objectAssign({}, project, {
    members: project.members.map(member =>
      updateProjectMemberOnTaskSwtich(member, action)
    )
  });
};

// Update project object on new member addition
const updateProjectOnMemberAddition = (project = {}, action) => {
  if (project.key !== action.projectKey) {
    return project;
  }
  return objectAssign({}, project, {
    members: project.members.concat({
      nameId: action.nameId,
      tasks: []
    })
  });
};

// Update project object for a member's task status change
const updateProjectOnTaskUpdation = (project = {}, action) => {
  if (project.key !== action.projectKey) {
    return project;
  }
  return objectAssign({}, project, {
    members: project.members.map(member =>
      updateProjectMemberOnTaskUpdation(member, action)
    )
  });
};

const projectDetails = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TASK':
      return objectAssign({}, state, {
        projects: state.projects.map(project =>
          updateProjectOnTaskCreation(project, action)
        )
      });
    case 'CREATE_PROJECT':
      return objectAssign({}, state, {
        projects: state.projects.concat({
          title: action.title,
          key: action.title.split(' ').join('_').toLowerCase(),
          description: action.description,
          members: createMembersForNewProjectById(action.membersArray)
        })
      });
    case 'ADD_NEW_MEMBER_TO_PROJECT':
      return objectAssign({}, state, {
        projects: state.projects.map(project =>
          updateProjectOnMemberAddition(project, action)
        )
      });
    case 'CHANGE_TASK_STATUS':
      return objectAssign({}, state, {
        projects: state.projects.map(project =>
          updateProjectOnTaskUpdation(project, action)
        )
      });
    case 'TASK_SWITCH':
      return objectAssign({}, state, {
        projects: state.projects.map(project =>
          updateProjectOnTaskSwitch(project, action)
        )
      });
    case 'SHOW_CREATE_PROJECT_DIALOG':
      return objectAssign({}, state, {
        isShowCreateProjectDialog: true
      });
    case 'SHOW_CREATE_TASK_DIALOG':
      return objectAssign({}, state, {
        isShowCreateTaskDialog: true
      });
    case 'HIDE_CREATE_PROJECT_DIALOG':
      return objectAssign({}, state, {
        isShowCreateProjectDialog: false
      });
    case 'HIDE_CREATE_TASK_DIALOG':
      return objectAssign({}, state, {
        isShowCreateTaskDialog: false
      });
    default:
      return state;
  }
};

export default projectDetails;
