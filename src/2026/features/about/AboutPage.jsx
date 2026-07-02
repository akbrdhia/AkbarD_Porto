import AboutHero from './AboutHero';
import AboutIdentity from './AboutIdentity';
import AboutJourney from './AboutJourney';

const AboutPage = () => {
  return (
    <div className="bg-black text-white">
      <AboutHero />
      <AboutJourney />
      <AboutIdentity />
    </div>
  );
};

export default AboutPage;
