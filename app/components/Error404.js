import React, { PropTypes } from 'react';

function Error404() {
  const styles = {
    container: {
      margin: '24px 0',
      paddingTop: '32px'
    },
    title: {
      margin: '24px 0',
      color: '#2d2e2e',
      lineHeight: '1.8rem',
      height: '2.4rem',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  };

  return (
    <div style={styles.container} className="row">
      <div className="col s12">
        <h3 style={styles.title}>This page does not exist...</h3>
      </div>
    </div>
  );
}

Error404.propTypes = {
  type: PropTypes.string,
  list: PropTypes.array
};

export default Error404;
