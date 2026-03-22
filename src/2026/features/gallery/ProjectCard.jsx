import React from 'react';

const ProjectCard = ({ color }) => {
  return (
    <div 
      className="aspect-video w-full overflow-hidden cursor-pointer group"
      style={{ backgroundColor: color }}
    >
      {/* Visual placeholder since we don't have rich media assets yet */}
      <div 
        className="w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
      />
    </div>
  );
};

export default ProjectCard;