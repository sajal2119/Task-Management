import { connect } from 'react-redux';
import { projectDetails } from '../../../actions';
import MemberPresentation from '../presentational/Member';

const mapStateToProps = (state) => ({
  employees: state.projectDetails.employees
});

const mapDispatchToProps = (dispatch) => ({
  onTaskSwitch: (draggedMemberId, droppedMemberId, draggedTaskId, projectKey) => {
    dispatch(projectDetails.switchTask(draggedMemberId, droppedMemberId, draggedTaskId, projectKey));
  }
});

// Map or connect Member presentational component to Member
const Member = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberPresentation);

export default Member;
