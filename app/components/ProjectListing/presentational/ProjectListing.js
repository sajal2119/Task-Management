import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/AppBar';
import ProjectListItem from './ProjectListItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ProjectListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titleErrorText: '',
      description: '',
      descriptionErrorText: '',
      member: null,
      memberErrorText: '',
      isNewProjectFormValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkFormValid = this.checkFormValid.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleCreateProjectFormSubmit = this.handleCreateProjectFormSubmit.bind(this);
    this.handleHideCreateProjectDialog = this.handleHideCreateProjectDialog.bind(this);
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
    const keyName = 'member';

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
    const { title, description, member } = this.state;
    if (title.length <= 0 || description.length <= 0 || member === null) {
      this.setState({
        isNewProjectFormValid: false
      });
    } else {
      this.setState({
        isNewProjectFormValid: true
      });
    }
  }

  handleHideCreateProjectDialog() {
    this.props.onHideCreateProjectDialog();
    this.setState({
      title: '',
      titleErrorText: '',
      description: '',
      descriptionErrorText: '',
      member: null,
      memberErrorText: '',
      isNewProjectFormValid: false
    });
  }

  handleCreateProjectFormSubmit() {
    const { title, description, member } = this.state;
    const projectData = {
      title,
      description,
      members: [member]
    };
    this.props.onCreateProject(projectData);
    this.handleHideCreateProjectDialog();
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
      }
    };
    const {
      employees,
      projects,
      isShowCreateProjectDialog,
      onShowCreateProjectDialog
    } = this.props;
    const {
      title,
      description,
      member,
      titleErrorText,
      descriptionErrorText,
      memberErrorText,
      isNewProjectFormValid
    } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        style={styles.actionButton}
        onTouchTap={this.handleHideCreateProjectDialog}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled={!isNewProjectFormValid}
        style={styles.actionButton}
        keyboardFocused
        onTouchTap={this.handleCreateProjectFormSubmit}
      />
    ];

    return (
      <div>
        <AppBar
          style={{ backgroundColor: '#00bfa5' }}
          title={<span>Task Management</span>}
          iconElementLeft={<span />}
        />
        <Dialog
          title="Create new task"
          actions={actions}
          modal={false}
          autoScrollBodyContent
          open={isShowCreateProjectDialog}
          onRequestClose={this.handleHideCreateTaskDialog}
        >
          <div>
            <TextField
              floatingLabelText="Project Title"
              style={styles.textBox}
              fullWidth
              onChange={this.handleChange}
              value={title}
              errorText={titleErrorText}
              name="title"
            />
            <TextField
              floatingLabelText="Project Description"
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
              value={member}
              fullWidth
              floatingLabelText="Member"
              onChange={this.handleStatusChange}
              labelStyle={styles.selectLabel}
              errorText={memberErrorText}
            >
              {employees.map((employee) =>
                <MenuItem
                  key={employee.id}
                  value={employee.id}
                  primaryText={employee.name}
                />)
              }
            </SelectField>
          </div>
        </Dialog>
        <div className="row" style={styles.row}>
          {projects.map((project) =>
            <ProjectListItem
              key={project.key}
              detailedUrl={project.key}
              title={project.title}
              description={project.description}
              totalMembers={project.members.length}
            />)
          }
          <div className="col s12 m6 l4">
            <div
              className="card"
              style={styles.actionContainer}
              onClick={onShowCreateProjectDialog}
            >
              <div style={styles.action}>
                Create New Project
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectListing.propTypes = {
  employees: PropTypes.array,
  projects: PropTypes.array,
  onCreateProject: PropTypes.func,
  isShowCreateProjectDialog: PropTypes.bool,
  onShowCreateProjectDialog: PropTypes.func,
  onHideCreateProjectDialog: PropTypes.func
};

export default ProjectListing;
