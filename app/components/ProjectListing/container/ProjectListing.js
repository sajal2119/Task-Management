import { connect } from 'react-redux';
import { projectDetails } from '../../../actions';
import ProjectListingPresentation from '../presentational/ProjectListing';

const mapStateToProps = (state) => ({
  isShowCreateProjectDialog: state.projectDetails.isShowCreateProjectDialog,
  employees: state.projectDetails.employees,
  projects: state.projectDetails.projects,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateProject: (projectData) => {
    dispatch(projectDetails.createProject(projectData));
  },
  onShowCreateProjectDialog: () => {
    dispatch(projectDetails.showCreateProjectDialog());
  },
  onHideCreateProjectDialog: () => {
    dispatch(projectDetails.hideCreateProjectDialog());
  }
});

// Map or connect ProjectListing presentational component to ProjectListing
const ProjectListing = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectListingPresentation);

export default ProjectListing;
