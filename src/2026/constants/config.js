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
    { name: 'Projects', path: '/2026/projects' }
  ],
  location: PERSONAL_INFO.location,
  timezone: 'Western Indonesian Time'
};
