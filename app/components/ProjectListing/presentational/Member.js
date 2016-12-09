import React, { PropTypes } from 'react';
import { Task } from '../container';
import { Draggable, Droppable } from 'react-drag-and-drop'

const styles = {
  container: {
    padding: '4px 16px',
    borderLeft: 'dashed 1px #c1c1c1',
    minHeight: '300px',
    fontSize: '14px'
  },
  name: {
    marginBottom: '20px',
    padding: '24px 12px',
    fontSize: '20px',
    textAlign: 'center',
    fontWeight: '500'
  },
  actionContainer: {
    fontSize: '14px',
    padding: '16px',
    cursor: 'pointer',
    minHeight: '80px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '60px'
  },
  action: {
    flexGrow: '100',
    color: '#aaa'
  }
};

const Member = ({
  nameId,
  tasks,
  projectKey,
  employees,
  onShowCreateTaskDialog,
  onTaskSwitch
}) => {
  const selectedEmployee = employees.filter(employee => employee.id === nameId)[0];
  const handleTaskSwitch = (switchedTaskData) => {
    const switchedTaskDataArray = switchedTaskData.task.split('-');
    if (switchedTaskDataArray[1] !== nameId) {
      onTaskSwitch(switchedTaskDataArray[1], nameId, switchedTaskDataArray[0], projectKey);
    }
  };

  return (
    <div className="col s12 m4 l3" style={styles.container}>
      <Droppable
        types={['task']} // <= allowed drop types
        onDrop={(data) => {handleTaskSwitch(data);}}
      >
        <div className="z-depth-2" style={styles.name}>
          {selectedEmployee.name}
        </div>
        {tasks.map((task) =>
          <Draggable type="task" data={`${task.id}-${nameId}`} key={task.id}>
            <Task
              projectKey={projectKey}
              nameId={nameId}
              {...task}
            />
          </Draggable>)
        }
        <div
          className="card"
          style={styles.actionContainer}
          onClick={() => {onShowCreateTaskDialog(nameId);}}
        >
          <div style={styles.action}>
            Create New Task
          </div>
        </div>
      </Droppable>
    </div>
  );
};

Member.propTypes = {
  nameId: PropTypes.string,
  tasks: PropTypes.array,
  employees: PropTypes.array,
  projectKey: PropTypes.string,
  onTaskSwitch: PropTypes.func,
  onShowCreateTaskDialog: PropTypes.func
};

export default Member;
