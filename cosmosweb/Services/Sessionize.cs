using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using cosmosweb.Models;


namespace cosmosweb.Services
{
    public class Sessionize
    {
        

        public async Task<ConferenceSchedule> GetSessions()
        {

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();          
            Task<string> response = client.GetStringAsync("https://sessionize.com/api/v2/r45vzc0j/view/Sessions");
            string r = await response;
            //dynamic resp = JsonConvert.DeserializeObject<dynamic>(r);

            List<SessionizeResponse> resp = JsonConvert.DeserializeObject<List<SessionizeResponse>>(r);

            List<SessionizeSession> sessionizeSessions = resp[0].SessionizeSessions;

            List<LiveSession> liveSessions = new List<LiveSession>();
            List<OnDemandSession> onDemandSessions = new List<OnDemandSession>();

            foreach(SessionizeSession szSession in sessionizeSessions)
            {
                if(szSession.Categories[0].CategoryItems[0].Name == "On Demand")
                {
                    onDemandSessions.Add(new OnDemandSession
                    {
                        Id = szSession.Id,
                        Title = szSession.Title,
                        Description = szSession.Description,
                        Watch = szSession.questionAnswers[0].Answer,
                        Speakers = szSession.Speakers
                    });
                }
                else
                {
                    liveSessions.Add(new LiveSession
                    {
                        Id = szSession.Id,
                        Title = szSession.Title,
                        Description = szSession.Description,
                        Watch = szSession.questionAnswers[0].Answer,
                        StartsAt = szSession.StartsAt,
                        EndsAt = szSession.EndsAt,
                        Speakers = szSession.Speakers
                    });
                }
            }

            ConferenceSchedule schedule = new ConferenceSchedule
            {
                LiveSessions = liveSessions,
                OnDemandSessions = onDemandSessions
            };


            return schedule;

        }


    }
}
