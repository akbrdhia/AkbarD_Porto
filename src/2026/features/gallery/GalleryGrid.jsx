import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    name: "ODS Form",
    description: "Customized form builder and management system for streamlined data collection.",
    tech: ["React", "Tailwind", "Laravel"],
    status: "LIVE",
    year: "2025",
    color: "#4A7EF5",
    preview: "/projects/odsform.png",
    link: "odsform.kop.go.id",
  },
  {
    name: "Manager Usaha V2",
    description: "Business metrics & inventory automation with on-device AI classification.",
    tech: ["Kotlin", "Laravel", "ML Kit"],
    status: "LIVE",
    year: "2024",
    color: "#9CCC65",
    preview: "/Manager_usahav2.png",
    link: "",
  },
  {
    name: "Cogito",
    description: "AI debate companion that generates counter-arguments in real time.",
    tech: ["Express", "PostgreSQL", "Kotlin", "Qwen"],
    status: "BETA",
    year: "2024",
    color: "#AED581",
    preview: "/assets/projects/cogito.jpg",
    link: "https://github.com/LazyPota/Cogito/tree/main",
  },
  {
    name: "Sako",
    description: "Simpan-pinjam assistant for cooperatives—payments, analytics, plus reporting.",
    tech: ["React", "Laravel"],
    status: "BETA",
    year: "2023",
    color: "#C5E1A5",
    preview: "/Sako-login.png",
    link: "",
  },
];

const GalleryGrid = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-0 w-full bg-black border-t border-white/5">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} project={project} index={index} />
      ))}
    </section>
  );
};

export default GalleryGrid;