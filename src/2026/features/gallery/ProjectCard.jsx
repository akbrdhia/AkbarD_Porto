import React from 'react';

const ProjectCard = ({ color }) => {
  return (
    <div style={{
      aspectRatio: '16/9',
      width: '100%',
      backgroundColor: color,
      overflow: 'hidden',
      cursor: 'pointer'
    }}>
      {/* Visual placeholder since we don't have rich media assets yet */}
      <div style={{
        width: '100%', height: '100%',
        transition: 'transform 400ms cubic-bezier(0.2, 0, 0, 1)'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
  );
};

export default ProjectCard;
