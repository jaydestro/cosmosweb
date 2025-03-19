import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import ReactMarkdown from 'react-markdown'; // ✅ Import ReactMarkdown for proper formatting
import { useLocation, useHistory } from '@docusaurus/router';
import './Speaker.css';

const X_LOGO_LIGHT = '/img/icons/x-logo-black.png';
const X_LOGO_DARK = '/img/icons/x-logo-white.png';
const LINKEDIN_LOGO_LIGHT = '/img/icons/InBug-Black.png';
const LINKEDIN_LOGO_DARK = '/img/icons/InBug-White.png';

interface Speaker {
  img: string;
  name: string;
  title: string;
  intro: string;
  bio: string;
  sessionTitle: string;
  sessionAbstract: string;
  sessionDuration: string;
  x?: string;
  linkedin?: string;
}

const Speaker = () => {
  const location = useLocation();
  const history = useHistory();

  const [speaker, setSpeaker] = useState<Speaker>({
    name: '',
    title: '',
    intro: '',
    bio: '',
    sessionTitle: '',
    sessionAbstract: '',
    img: '',
    sessionDuration: '',
    x: '',
    linkedin: '',
  });

  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      setSpeaker({
        img: searchParams.get('img') || '',
        name: searchParams.get('name') || '',
        title: searchParams.get('title') || '',
        intro: searchParams.get('intro') || '',
        bio: searchParams.get('bio') ? decodeURIComponent(searchParams.get('bio')!) : '',
        sessionTitle: searchParams.get('sessionTitle') || '',
        sessionAbstract: searchParams.get('sessionAbstract') || '',
        sessionDuration: searchParams.get('sessionDuration') || '',
        x: searchParams.get('x') || '',
        linkedin: searchParams.get('linkedin') || '',
      });
    }
  }, [location.search]);

  // ✅ Detect dark mode safely without `useColorMode()`
  const isDarkMode = typeof window !== 'undefined' && document.documentElement.dataset.theme === 'dark';

  return (
    <Layout
      title={`${speaker.name} - Speaker Details`}
      description={`Details about ${speaker.name}'s session at Azure Cosmos DB Conf 2025`}
    >
      <div className="speaker-detail-container">
        <button className="back-button" onClick={() => history.goBack()}>
          ← Back to Speakers List
        </button>

        <div className="speaker-card">
          {speaker.img && <img src={speaker.img} alt={speaker.name} className="speaker-img" />}

          <div className="speaker-content">
            {/* Speaker Name & Title */}
            <h1>{speaker.title}</h1>
            <p>{speaker.intro}</p>

            {/* ✅ Social Icons (Directly Below Name & Title) */}
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
              <h2>
                Session Details ({speaker.sessionDuration === '5' ? '5 Minute Lightning Talk' : '25 Minute Session'})
              </h2>
              <p className="session-title">{speaker.sessionTitle}</p>

              {/* ✅ Use ReactMarkdown for proper session abstract formatting */}
              <div className="session-abstract">
                <ReactMarkdown>{speaker.sessionAbstract}</ReactMarkdown>
              </div>
            </div>

            {/* Speaker Bio */}
            {speaker.bio && (
              <div className="bio-section">
                <h2>Speaker Bio</h2>
                
                {/* ✅ Use ReactMarkdown for proper bio formatting */}
                <div className="bio-text">
                  <ReactMarkdown>{speaker.bio}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Speaker;
