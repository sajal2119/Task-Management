import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { projectDetails } from '../../../actions';
import ProjectDetailsPresentation from '../presentational/ProjectDetails';

const mapStateToProps = (state) => ({
  isShowCreateTaskDialog: state.projectDetails.isShowCreateTaskDialog,
  taskStatuses: state.projectDetails.taskStatuses,
  employees: state.projectDetails.employees,
  projects: state.projectDetails.projects,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateTask: (taskData) => {
    dispatch(projectDetails.createTask(taskData));
  },
  onAddNewMemberToProject: (nameId, projectKey) => {
    dispatch(projectDetails.addNewMemberToProject(nameId, projectKey));
  },
  onShowCreateTaskDialog: () => {
    dispatch(projectDetails.showCreateTaskDialog());
  },
  onHideCreateTaskDialog: () => {
    dispatch(projectDetails.hideCreateTaskDialog());
  },
  onClose: () => {
    dispatch(push(''));
  }
});

// Map or connect ProjectDetails presentational component to ProjectDetails
const ProjectDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailsPresentation);

export default ProjectDetails;
