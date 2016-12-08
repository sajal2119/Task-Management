import { connect } from 'react-redux';
import { projectDetails } from '../../../actions';
import TaskPresentation from '../presentational/Task';

const mapStateToProps = (state) => ({
  taskStatuses: state.projectDetails.taskStatuses
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeTaskStatus: (newStatus) => {
    dispatch(projectDetails.changeTaskStatus(ownProps.projectKey, ownProps.nameId, ownProps.id, newStatus));
  },
});

// Map or connect Task presentational component to Task
const Task = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskPresentation);

export default Task;
