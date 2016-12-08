import React, { PropTypes } from 'react';
import { Task } from '../container';

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
    alignItems: 'center'
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
  onShowCreateTaskDialog
}) => {
  const selectedEmployee = employees.filter((employee => employee.id === nameId))[0];
  return (
    <div className="col s12 m4 l3" style={styles.container}>
      <div className="z-depth-2" style={styles.name}>
        {selectedEmployee.name}
      </div>
      {tasks.map((task) =>
        <Task
          projectKey={projectKey}
          nameId={nameId}
          key={task.id}
          {...task}
        />)
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
    </div>
  );
};

Member.propTypes = {
  nameId: PropTypes.string,
  tasks: PropTypes.array,
  employees: PropTypes.array,
  projectKey: PropTypes.string,
  onShowCreateTaskDialog: PropTypes.func
};

export default Member;
