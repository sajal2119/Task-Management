import React, { PropTypes } from 'react';
import objectAssign from 'object-assign';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const colorMap = {
  done: '#66bb6a',
  on_hold: '#ff7043',
  schedule: '#ffee58',
  in_process: '#b2dfdb',
  sent: '#42a5f5'
};

const styles = {
  container: {
    padding: '12px 16px 24px',
    marginBottom: '20px',
    backgroundColor: '#eee'
  },
  title: {
    textAlign: 'left',
    display: 'inline-block',
    fontWeight: '600',
    float: 'left',
    margin: '12px 8px 0px 0px',
    maxWidth: '100%',
    overflow: 'hidden'
  },
  status: {
    textAlign: 'right',
    display: 'inline-block'
  },
  description: {
    textAlign: 'left',
    fontWeight: '400',
    maxWidth: '100%',
    overflow: 'hidden'
  },
  selectLabel: {
    float: 'left',
    fontSize: '14px'
  }
};

const Task = ({
  title,
  description,
  statuskey,
  taskStatuses,
  onChangeTaskStatus
}) => (
  <div style={objectAssign({}, styles.container, { borderLeft: `5px solid ${colorMap[statuskey]}` })}>
    <div style={styles.title}>
      {title}
    </div>
    <div style={styles.status}>
      <SelectField
        value={statuskey}
        disabled={false}
        onChange={(event, key, value) => {onChangeTaskStatus(value);}}
        style={{ width: '130px' }}
        labelStyle={styles.selectLabel}
      >
        {taskStatuses.map((taskStatusItem) =>
          <MenuItem
            key={taskStatusItem.key}
            value={taskStatusItem.key}
            primaryText={taskStatusItem.name}
          />)
        }
      </SelectField>
    </div>
    <div style={styles.description}>
      {description}
    </div>
  </div>
);

Task.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  statuskey: PropTypes.string,
  taskStatuses: PropTypes.array,
  onChangeTaskStatus: PropTypes.func
};

export default Task;
