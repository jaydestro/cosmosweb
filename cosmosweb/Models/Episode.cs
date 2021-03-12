using Newtonsoft.Json;

namespace cosmosweb.Models
{
    public class Episode
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "show")]
        public string Show { get; set; }
        
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }
        
        [JsonProperty(PropertyName = "streamDate")]
        public string StreamDate { get; set; }
        
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "youTubeVideoId")]
        public string YouTubeVideoId { get; set; }

        [JsonProperty(PropertyName = "embedUri")]
        public string EmbedUri { get; set; }
        
        [JsonProperty(PropertyName = "watchUri")]
        public string WatchUri { get; set; }
    }

}
