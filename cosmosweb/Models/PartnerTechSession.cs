using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cosmosweb.Models
{

    public class PartnerTechSession
    {

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "date")]
        public DateTime Date { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "embedUri")]
        public string EmbedUri { get; set; }

        [JsonProperty(PropertyName = "watchUri")]
        public string WatchUri { get; set; }

    }

    public class QnASession
    {

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "date")]
        public DateTime Date { get; set; }

    }
    public class PartnerSessionSchedule
    {
        public IEnumerable<PartnerTechSession> partnerSessions;
        public IEnumerable<QnASession> qnaSessions;
    }
}
