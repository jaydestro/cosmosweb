using cosmosweb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cosmosweb.Services
{
    public class PartnerSession
    {
        public PartnerSessionSchedule GetPartnerSessions()
        {

            PartnerTechSession pt1 = new PartnerTechSession() { Date = new DateTime(2021, 11, 02, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Security" };
            PartnerTechSession pt2 = new PartnerTechSession() { Date = new DateTime(2021, 12, 07, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Partitioning & Scaling" };
            PartnerTechSession pt3 = new PartnerTechSession() { Date = new DateTime(2022, 01, 04, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Migration to SQL and MongoDB APIs" };
            PartnerTechSession pt4 = new PartnerTechSession() { Date = new DateTime(2022, 02, 01, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Development with Emulator" };
            PartnerTechSession pt5 = new PartnerTechSession() { Date = new DateTime(2022, 03, 01, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Querying with SQL API" };
            PartnerTechSession pt6 = new PartnerTechSession() { Date = new DateTime(2022, 05, 05, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Request Units and throughput estimation" };
            List<PartnerTechSession> _sessions = new List<PartnerTechSession>();
            _sessions.Add(pt1);
            _sessions.Add(pt2);
            _sessions.Add(pt3);
            _sessions.Add(pt4);
            _sessions.Add(pt5);
            _sessions.Add(pt6);
            QnASession qna1 = new QnASession() { Date = new DateTime(2021, 11, 12, 10, 00, 00, 00, DateTimeKind.Utc) };
            QnASession qna2 = new QnASession() { Date = new DateTime(2021, 12, 10, 10, 00, 00, 00, DateTimeKind.Utc) };
            QnASession qna3 = new QnASession() { Date = new DateTime(2022, 01, 14, 10, 00, 00, 00, DateTimeKind.Utc) };
            QnASession qna4 = new QnASession() { Date = new DateTime(2022, 02, 11, 10, 00, 00, 00, DateTimeKind.Utc) };
            QnASession qna5 = new QnASession() { Date = new DateTime(2022, 03, 11, 10, 00, 00, 00, DateTimeKind.Utc) };
            QnASession qna6 = new QnASession() { Date = new DateTime(2022, 04, 8, 10, 00, 00, 00, DateTimeKind.Utc) };
            List<QnASession> _qnaSessions = new List<QnASession>();
            _qnaSessions.Add(qna1);
            _qnaSessions.Add(qna2);
            _qnaSessions.Add(qna3);
            _qnaSessions.Add(qna4);
            _qnaSessions.Add(qna5);
            _qnaSessions.Add(qna6);
            PartnerSessionSchedule schedule = new PartnerSessionSchedule
            {
                partnerSessions = _sessions,
                qnaSessions = _qnaSessions
            };
            return schedule;
        }
    }
}
