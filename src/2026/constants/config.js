import { PERSONAL_INFO } from '../../2025/constants/portfolioData';

export const CONFIG_2026 = {
  social: [
    { name: 'Email', url: `mailto:${PERSONAL_INFO.email}` },
    { name: 'LinkedIn', url: `https://linkedin.com/in/${PERSONAL_INFO.linkedin}` },
    { name: 'GitHub', url: `https://github.com/akbrdhia` },
    { name: 'Instagram', url: 'https://www.instagram.com/bukan__akbarr/' },
    { name: 'Blog', url: 'https://blog.akbardhia.me' }
  ],
  nav: [
    { name: 'Home', path: '/2026' },
    { name: 'About', path: '/2026/about' },
    { name: 'Projects', path: '/2026/projects' },
    { name: 'Contact', path: '/2026/contact' }
  ],
  location: PERSONAL_INFO.location,
  timezone: 'Western Indonesian Time',
  experience: [
    {
      year: '2023-2026',
      company: 'SMK',
      role: 'RPL (Rekayasa Perangkat Lunak) Student',
      tech: 'Kotlin, Python, React, Laravel, Java, C#, MySQL, PostgreSQL, Docker, Git',
      items: [
        'Built Manager Usaha — final project: business inventory app with on-device ML',
        'Built Cogito — AI debate companion for hackathon',
        'Built Download Organizer — CLI tool for file management',
      ],
    },
    {
      year: '2025',
      company: 'KEMENKOP RI',
      role: 'Intern Mobile Developer',
      tech: 'Laravel, React, SQLServer, MySQL, Docker',
      items: [
        'Built ODS Form — custom form builder for cooperative profiles',
        'Worked on ODS Mandiri — national cooperative data system',
        'Developed internal tools with Laravel',
      ],
    },
    {
      year: '2026',
      company: 'Solera',
      role: 'Fullstack Developer',
      tech: 'Next.js, Express, Prisma, MySQL, Docker',
      items: [
        'Built school ecosystem super-app — closed-loop fintech, marketplace, community platform',
        'Integrated multiple payment gateways (Midtrans, Xendit, Tripay)',
      ],
    },
  ],
};
