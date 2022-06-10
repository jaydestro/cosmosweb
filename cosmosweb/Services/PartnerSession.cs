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
            PartnerTechSession pt1 = new PartnerTechSession() { Date = new DateTime(2021, 11, 02, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Managing security for Azure Cosmos DB accounts", EmbedUri = "https:\\/www.youtube.com/embed/LCcyWC-yQeE", WatchUri = "https://www.youtube.com/watch?v=LCcyWC-yQeE" , Description = "In this video Saranya walks us through the security fundamentals in Azure Cosmos DB. You will learn how to networking, authentication/authorization, encryption and monitoring capabilities to protect your data within the account." };
            PartnerTechSession pt2 = new PartnerTechSession() { Date = new DateTime(2021, 12, 07, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Partitioning Overview & Best Practices", EmbedUri = "https:\\/www.youtube.com/embed/RT22v4rgtU4", WatchUri = "https://www.youtube.com/watch?v=RT22v4rgtU4", Description = "In this video Deborah talks through partitioning key concepts and how it works internally within the Azure Cosmos DB platform. She also provides the steps and  guidance to help you get your partitioning strategy right." };
            PartnerTechSession pt3 = new PartnerTechSession() { Date = new DateTime(2022, 01, 04, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Migration to SQL and MongoDB APIs", EmbedUri = "https:\\/www.youtube.com/embed/hRO5C0-QuFQ", WatchUri = "https://www.youtube.com/watch?v=hRO5C0-QuFQ", Description = "In this video Shweta walks us through the benefits of migrating to Azure Cosmos DB document APIs. You will learn tips on how to plan your migration and the tools  available to perform homogenous and heterogenous migrations." };
            PartnerTechSession pt4 = new PartnerTechSession() { Date = new DateTime(2022, 02, 01, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Migrating to Cassandra Managed Instance and API", EmbedUri = "https:\\/www.youtube.com/embed/1wiOffS4tiE", WatchUri = "https://www.youtube.com/watch?v=1wiOffS4tiE", Description = "In this video Theo walks us through how to choose between the Azure Cosmos DB Cassandra API and Managed Instance (MI) offerings. You will learn how you can configure a hybrid cluster using Cassandra MI, as well as how to migrate from to each of these offering types live using dual-write proxy." };
            PartnerTechSession pt5 = new PartnerTechSession() { Date = new DateTime(2022, 03, 01, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Querying with SQL API", EmbedUri = "https:\\/www.youtube.com/embed/Anf1o2L_zpU", WatchUri = "https://www.youtube.com/watch?v=Anf1o2L_zpU", Description = "In this video Sajee walks us through how to get started with and how to manage the Azure Cosmos DB SQL API accounts. He also shares the best practices and troubleshooting techniques to optimize the queries." };
            PartnerTechSession pt6 = new PartnerTechSession() { Date = new DateTime(2022, 05, 05, 10, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Request Units and throughput estimation", EmbedUri = "https:\\/www.youtube.com/embed/0ej7MNAU1kw", WatchUri = "https://www.youtube.com/watch?v=0ej7MNAU1kw", Description = "In this video Abhinav explains what RUs are and why it is important to get the RUs and throughput estimates right while using Azure Cosmos DB. He also shares how to estimate the right throughput for new workloads as well as migrations." };
            List <PartnerTechSession> _sessions = new List<PartnerTechSession>();
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
