import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Member } from '../container';

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titleErrorText: '',
      description: '',
      descriptionErrorText: '',
      status: null,
      statusErrorText: '',
      isNewTaskFormValid: false,
      selectedMemberKey: null,
      isShowAddMemberCard: false,
      newMemberKey: null,
      isAddMemberFormValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkFormValid = this.checkFormValid.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleShowCreateTaskDialog = this.handleShowCreateTaskDialog.bind(this);
    this.handleCreateTaskFormSubmit = this.handleCreateTaskFormSubmit.bind(this);
    this.addNewMemberFomrSubmit = this.addNewMemberFomrSubmit.bind(this);
    this.handleHideCreateTaskDialog = this.handleHideCreateTaskDialog.bind(this);
  }

  handleChange(e) {
    const key = {};
    const newValue = e.target.value;
    const keyName = e.target.name;

    key[keyName] = newValue;
    if (newValue.length <= 0) {
      key[`${keyName}ErrorText`] = 'Field is required';
      this.setState(key);
    } else {
      key[`${keyName}ErrorText`] = '';
      this.setState(key, this.checkFormValid);
    }
  }

  handleStatusChange(event, indexKey, value) {
    const key = {};
    const keyName = 'status';

    key[keyName] = value;
    if (value === null) {
      key[`${keyName}ErrorText`] = 'Field is required';
      this.setState(key);
    } else {
      key[`${keyName}ErrorText`] = '';
      this.setState(key, this.checkFormValid);
    }
  }

  checkFormValid() {
    const { title, description, status } = this.state;
    if (title.length <= 0 || description.length <= 0 || status === null) {
      this.setState({
        isNewTaskFormValid: false
      });
    } else {
      this.setState({
        isNewTaskFormValid: true
      });
    }
  }

  handleShowCreateTaskDialog(selectedMemberKey) {
    this.setState({
      selectedMemberKey
    }, this.props.onShowCreateTaskDialog);
  }

  handleHideCreateTaskDialog() {
    this.props.onHideCreateTaskDialog();
    this.setState({
      title: '',
      titleErrorText: '',
      description: '',
      descriptionErrorText: '',
      status: null,
      statusErrorText: '',
      isNewTaskFormValid: false,
      selectedMemberKey: null
    });
  }

  handleCreateTaskFormSubmit() {
    const { title, description, status, selectedMemberKey } = this.state;
    const taskData = {
      projectKey: this.props.params.projectKey,
      title,
      description,
      status,
      nameId: selectedMemberKey
    };
    this.props.onCreateTask(taskData);
    this.handleHideCreateTaskDialog();
  }

  addNewMemberFomrSubmit() {
    const { newMemberKey } = this.state;
    this.props.onAddNewMemberToProject(newMemberKey, this.props.params.projectKey);
    this.setState({
      isShowAddMemberCard: false,
      newMemberKey: null,
      isAddMemberFormValid: false
    });
  }

  render() {
    const styles = {
      row: {
        padding: '0px 20px',
        marginTop: '40px'
      },
      actionContainer: {
        fontSize: '14px',
        padding: '24px',
        cursor: 'pointer',
        minHeight: '150px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center'
      },
      action: {
        flexGrow: '100',
        color: '#1283ff'
      },
      textBox: {
        marginTop: '12px'
      },
      selectBox: {
        margin: '12px 0px'
      },
      selectLabel: {
        float: 'left',
        fontSize: '14px'
      },
      actionButton: {
        margin: '12px 4px'
      },
      newMemberContainer: {
        padding: '4px 16px',
        borderLeft: 'dashed 1px #c1c1c1',
        minHeight: '300px',
        fontSize: '14px'
      },
      newMemberActionContainer: {
        fontSize: '14px',
        padding: '24px',
        cursor: 'pointer',
        textAlign: 'center'
      },
    };
    const {
      params,
      taskStatuses,
      projects,
      isShowCreateTaskDialog,
      onClose,
      employees
    } = this.props;
    const {
      title,
      description,
      status,
      titleErrorText,
      descriptionErrorText,
      statusErrorText,
      isNewTaskFormValid,
      isShowAddMemberCard,
      newMemberKey,
      isAddMemberFormValid
    } = this.state;

    const selectedProject = projects.filter(
      (projectItem) => projectItem.key === params.projectKey
    )[0];

    const membersInProject = selectedProject.members.map((member) => member.nameId);
    const membersNotInPorject = employees.filter((employee) => (membersInProject.indexOf(employee.id) === -1));

    const createTaskActions = [
      <FlatButton
        label="Cancel"
        primary
        style={styles.actionButton}
        onTouchTap={this.handleHideCreateTaskDialog}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled={!isNewTaskFormValid}
        style={styles.actionButton}
        keyboardFocused
        onTouchTap={this.handleCreateTaskFormSubmit}
      />
    ];

    return (
      <div>
        <AppBar
          style={{ backgroundColor: '#00bfa5' }}
          title={<span>{selectedProject.title}</span>}
          iconElementLeft={<span />}
          iconElementRight={<IconButton onClick={onClose}><NavigationClose /></IconButton>}
        />
        <Dialog
          title="Create new task"
          actions={createTaskActions}
          modal={false}
          autoScrollBodyContent
          open={isShowCreateTaskDialog}
          onRequestClose={this.handleHideCreateTaskDialog}
        >
          <div>
            <TextField
              floatingLabelText="Task Title"
              style={styles.textBox}
              fullWidth
              onChange={this.handleChange}
              value={title}
              errorText={titleErrorText}
              name="title"
            />
            <TextField
              floatingLabelText="Task Description"
              style={styles.textBox}
              rows={2}
              rowsMax={3}
              onChange={this.handleChange}
              value={description}
              errorText={descriptionErrorText}
              fullWidth
              name="description"
            />
            <SelectField
              value={status}
              fullWidth
              floatingLabelText="Status"
              onChange={this.handleStatusChange}
              labelStyle={styles.selectLabel}
              errorText={statusErrorText}
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
        </Dialog>
        <div className="row" style={styles.row}>
          {selectedProject.members.map((member) =>
            <Member
              key={member.nameId}
              onShowCreateTaskDialog={this.handleShowCreateTaskDialog}
              projectKey={selectedProject.key}
              {...member}
            />)
          }
          {membersNotInPorject.length > 0  && <div className="col s12 m4 l3" style={styles.newMemberContainer}>
            <div
              className="card"
              style={styles.newMemberActionContainer}
              onClick={() => {this.setState({ isShowAddMemberCard: true });}}
            >
              <div style={styles.action}>
                Add New Member
              </div>
            </div>
            {isShowAddMemberCard && <div
              className="card"
              style={styles.newMemberActionContainer}
            >
              <div>
                <SelectField
                  value={newMemberKey}
                  fullWidth
                  onChange={(event, key, value) => {this.setState({ isAddMemberFormValid: true, newMemberKey: value });}}
                  floatingLabelText="Select New Member"
                  labelStyle={styles.selectLabel}
                >
                  {membersNotInPorject.map((employee) =>
                    <MenuItem
                      key={employee.id}
                      value={employee.id}
                      primaryText={employee.name}
                    />)
                  }
                </SelectField>
              </div>
              <div>
                <FlatButton
                  label="Cancel"
                  primary
                  style={styles.actionButton}
                  onTouchTap={() => {
                    this.setState({
                      isShowAddMemberCard: false,
                      newMemberKey: null,
                      isAddMemberFormValid: false
                    });}}
                />
                <FlatButton
                  label="Add"
                  primary
                  disabled={!isAddMemberFormValid}
                  style={styles.actionButton}
                  keyboardFocused
                  onTouchTap={this.addNewMemberFomrSubmit}
                />
                </div>
            </div>}
          </div>}
        </div>
      </div>
    );
  }
}

ProjectDetails.propTypes = {
  params: PropTypes.object,
  taskStatuses: PropTypes.array,
  employees: PropTypes.array,
  projects: PropTypes.array,
  onClose: PropTypes.func,
  onCreateTask: PropTypes.func,
  onAddNewMemberToProject: PropTypes.func,
  isShowCreateTaskDialog: PropTypes.bool,
  onShowCreateTaskDialog: PropTypes.func,
  onHideCreateTaskDialog: PropTypes.func
};

export default ProjectDetails;
