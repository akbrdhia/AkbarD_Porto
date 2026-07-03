import AboutHero from './AboutHero';
import AboutJourney from './AboutJourney';
import AboutExperience from './AboutExperience';
import AboutIdentity from './AboutIdentity';

const AboutPage = () => {
  return (
    <div className="bg-black text-white">
      <AboutHero />
      <AboutJourney />
      <AboutExperience />
      <AboutIdentity />
    </div>
  );
};

export default AboutPage;
