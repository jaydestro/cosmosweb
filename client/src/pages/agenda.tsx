import React from 'react';
import Layout from '@theme/Layout';

export default function Agenda() {
  return (
    <Layout title="Agenda - Azure Cosmos DB Conf 2025" description="Conference schedule">
      <main>
        <div className="container">
          <br />
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
            📅 Agenda Coming Soon
          </h2>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '1rem' }}>
            Stay tuned! We’re finalizing the schedule and will update this page soon. 🚀
          </p>
          <p style={{ textAlign: 'center', fontSize: '1.1rem', marginTop: '1.5rem' }}>
            You'll find all the <strong>live streaming</strong> and <strong>on-demand sessions</strong> here once the agenda is ready.
          </p>
        </div>
      </main>
    </Layout>
  );
}
