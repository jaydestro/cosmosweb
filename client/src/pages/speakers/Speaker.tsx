import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useLocation, useHistory } from '@docusaurus/router';
import speakersData from './speakers.json'; // ✅ Import JSON
import './Speaker.css';

const X_LOGO_LIGHT = '/img/icons/x-logo-black.png';
const X_LOGO_DARK = '/img/icons/x-logo-white.png';
const LINKEDIN_LOGO_LIGHT = '/img/icons/InBug-Black.png';
const LINKEDIN_LOGO_DARK = '/img/icons/InBug-White.png';

interface Session {
  title: string;
  abstract: string;
  duration: string; // "5" or "25"
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
  const [fromAgenda, setFromAgenda] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [speaker, setSpeaker] = useState<Speaker | null>(null);

  // ✅ Fetch speaker details from JSON instead of relying only on query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const speakerName = searchParams.get('name');

    if (!speakerName) {
      return;
    }

    const matchedSpeaker = speakersData.find((s) => s.name.toLowerCase() === speakerName.toLowerCase());

    if (matchedSpeaker) {
      setSpeaker(matchedSpeaker);
      setFromAgenda(searchParams.get('from') === 'agenda');
    }
  }, [location.search]);

  // ✅ Detect and update theme dynamically after mount
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
    return duration === '5'
      ? '5 Minute Lightning Talk'
      : duration === '25'
      ? '25 Minute Session'
      : 'Session Details';
  };

  if (!speaker) {
    return (
      <Layout title="Speaker Not Found">
        <div className="speaker-detail-container">
          <h1>Speaker Not Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${speaker.name} - Speaker Details`}
      description={`Details about ${speaker.name}'s session at Azure Cosmos DB Conf 2025`}
    >
      <div className="speaker-detail-container">
        {/* ✅ Back Button: Dynamic label based on navigation source */}
        <button className="back-button" onClick={() => history.push(fromAgenda ? '/agenda' : '/speakers')}>
          ← {fromAgenda ? 'Back to Agenda' : 'Back to Speakers List'}
        </button>

        <div className="speaker-card">
          {speaker.img && <img src={speaker.img} alt={speaker.name} className="speaker-img" />}

          <div className="speaker-content">
            {/* Speaker Name & Title */}
            <h1>{speaker.title}</h1>
            <p>{speaker.intro}</p>

            {/* ✅ Social Icons */}
            <div className="social-icons">
              {speaker.x && (
                <a href={speaker.x} target="_blank" rel="noopener noreferrer">
                  <img
                    className="social-icon"
                    src={isDarkMode ? X_LOGO_DARK : X_LOGO_LIGHT}
                    alt="X Logo"
                  />
                </a>
              )}
              {speaker.linkedin && (
                <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                  <img
                    className="social-icon"
                    src={isDarkMode ? LINKEDIN_LOGO_DARK : LINKEDIN_LOGO_LIGHT}
                    alt="LinkedIn Logo"
                  />
                </a>
              )}
            </div>

            {/* Session Details */}
            <div className="session-details">
              <h2>{getSessionLength(speaker.session.duration)}</h2>
              <p className="session-title">{speaker.session.title}</p>
              <p className="session-abstract">{speaker.session.abstract}</p>
            </div>

            {/* Speaker Bio */}
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
