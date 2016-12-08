import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const styles = {
  container: {
    fontSize: '14px',
    padding: '24px',
    minHeight: '150px'
  },
  title: {
    fontSize: '22px'
  },
  description: {
    opacity: '0.65'
  }
};

const ProjectListItem = ({
  detailedUrl,
  title,
  description,
  totalMembers
}) => (
  <div className="col s12 m6 l4">
    <Link to={`/${detailedUrl}`}>
      <div className="card" style={styles.container}>
        <div style={styles.title}>
          {title}
        </div>
        <div style={styles.description}>
          {description}
        </div>
        <div>
          Total members: {totalMembers}
        </div>
      </div>
    </Link>
  </div>
);


ProjectListItem.propTypes = {
  detailedUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  totalMembers: PropTypes.number
};

export default ProjectListItem;
