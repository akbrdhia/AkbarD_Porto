import AboutHero from './AboutHero';
import AboutJourney from './AboutJourney';
import AboutSkills from './AboutSkills';
import AboutIdentity from './AboutIdentity';

const AboutPage = ({ onOpenContact }) => {
  return (
    <div className="bg-black text-white">
      <AboutHero />
      <AboutJourney />
      <AboutSkills />
      <AboutIdentity onOpenContact={onOpenContact} />
    </div>
  );
};

export default AboutPage;
