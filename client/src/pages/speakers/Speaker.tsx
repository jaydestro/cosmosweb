import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useLocation, useHistory } from '@docusaurus/router';
import speakersData from './speakers.json';
import './Speaker.css';

const X_LOGO_LIGHT = '/img/icons/x-logo-black.png';
const X_LOGO_DARK = '/img/icons/x-logo-white.png';
const LINKEDIN_LOGO_LIGHT = '/img/icons/InBug-Black.png';
const LINKEDIN_LOGO_DARK = '/img/icons/InBug-White.png';

interface Session {
  title: string;
  abstract: string;
  duration: string;
  time: string;
  ondemand_only: boolean;
  youtube_url?: string;
}

interface Speaker {
  img: string;
  name: string;
  title: string;
  intro: string;
  bio: string;
  session: Session;
  x?: string;
  linkedin?: string;
}

const Speaker: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [speaker, setSpeaker] = useState<Speaker | undefined>(undefined); // ✅ Initialize as undefined
  const [fromAgenda, setFromAgenda] = useState(false);

  // ✅ Fetch speaker details from JSON
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const speakerName = searchParams.get('name');

    if (!speakerName) {
      setSpeaker(null); // ✅ If no name in URL, set to null (meaning "not found")
      return;
    }

    const matchedSpeaker = speakersData.find((s) => s.name.toLowerCase() === speakerName.toLowerCase());
    
    setSpeaker(matchedSpeaker ?? null); // ✅ Set to the speaker if found, otherwise set to null
    setFromAgenda(searchParams.get('from') === 'agenda');
  }, []);

  // ✅ Detect theme mode using MutationObserver
  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.dataset.theme === 'dark');
    };

    updateTheme(); // Initial theme check

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  // ✅ Ensure session duration displays correctly
  const getSessionLength = (duration: string): string => {
    switch (duration) {
      case '5':
        return '5-Minute Lightning Talk';
      case '25':
        return '25-Minute Session';
      default:
        return `Session (${duration} minutes)`;
    }
  };

  // ✅ Don't render anything until `useEffect` runs and sets `speaker`
  if (speaker === undefined) return null;

  // ✅ Show "Speaker Not Found" only if speaker is null (not undefined)
  if (!speaker) {
    return (
      <Layout title="Speaker Not Found">
        <div className="speaker-detail-container not-found">
          <h1>Oops! Speaker Not Found 😢</h1>
          <p>We couldn't find the speaker you're looking for. Try checking the list again.</p>
          <button className="back-button" onClick={() => history.push('/speakers')}>
            ← Back to Speakers
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${speaker.name} - Speaker Details`} description={`Details about ${speaker.name}'s session at Azure Cosmos DB Conf 2025`}>
      <div className="speaker-detail-container">
        <button className="back-button" onClick={() => history.push(fromAgenda ? '/agenda' : '/speakers')}>
          ← {fromAgenda ? 'Back to Agenda' : 'Back to Speakers List'}
        </button>

        <div className="speaker-card">
          {speaker.img && <img src={speaker.img} alt={speaker.name} className="speaker-img" />}

          <div className="speaker-content">
            <h1>{speaker.title}</h1>
            <p>{speaker.intro}</p>

            <div className="social-icons">
              {speaker.x && (
                <a href={speaker.x} target="_blank" rel="noopener noreferrer">
                  <img className="social-icon" src={isDarkMode ? X_LOGO_DARK : X_LOGO_LIGHT} alt="X Logo" />
                </a>
              )}
              {speaker.linkedin && (
                <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                  <img className="social-icon" src={isDarkMode ? LINKEDIN_LOGO_DARK : LINKEDIN_LOGO_LIGHT} alt="LinkedIn Logo" />
                </a>
              )}
            </div>

            <div className="session-details">
              <h2>{getSessionLength(speaker.session.duration)}</h2>
              <p className="session-title">{speaker.session.title}</p>
              <p className="session-abstract">{speaker.session.abstract}</p>
            </div>

            {speaker.bio && (
              <div className="bio-section">
                <h2>Speaker Bio</h2>
                <p>{speaker.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Speaker;
