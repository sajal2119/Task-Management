import { connect } from 'react-redux';
import MemberPresentation from '../presentational/Member';

const mapStateToProps = (state) => ({
  employees: state.projectDetails.employees
});

// Map or connect Member presentational component to Member
const Member = connect(
  mapStateToProps
)(MemberPresentation);

export default Member;
