using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cosmosweb.Models
{

    public class SessionizeResponse
    {
        [JsonProperty(PropertyName = "groupId")]
        public string GroupId { get; set; }

        [JsonProperty(PropertyName = "groupName")]
        public string GroupName { get; set; }

        [JsonProperty(PropertyName = "sessions")]
        public List<SessionizeSession> SessionizeSessions { get; set; }
    }
    public class SessionizeSession
    {
        [JsonProperty(PropertyName = "questionAnswers")]
        public List<QuestionAnswer> questionAnswers { get; set; }

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "startsAt")]
        public string StartsAt { get; set; }

        [JsonProperty(PropertyName = "endsAt")]
        public string EndsAt { get; set; }

        [JsonProperty(PropertyName = "isServiceSession")]
        public bool IsServiceSession { get; set; }

        [JsonProperty(PropertyName = "isPlenumSession")]
        public bool IsPlenumSession { get; set; }

        [JsonProperty(PropertyName = "speakers")]
        public List<Speaker> Speakers { get; set; }

        [JsonProperty(PropertyName = "categories")]
        public List<Category> Categories { get; set; }

        [JsonProperty(PropertyName = "roomId")]
        public string RoomId { get; set; }

        [JsonProperty(PropertyName = "room")]
        public string Room { get; set; }
    }

    public class QuestionAnswer
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "question")]
        public string Question { get; set; }

        [JsonProperty(PropertyName = "questionType")]
        public string QuestionType { get; set; }

        [JsonProperty(PropertyName = "answer")]
        public string Answer { get; set; }

        [JsonProperty(PropertyName = "sort")]
        public int Sort { get; set; }

        [JsonProperty(PropertyName = "answerExtra")]
        public string AnswerExtra { get; set; }
    }

    public class Speaker
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }

    public class Category
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "categoryItems")]
        public List<CategoryItem> CategoryItems { get; set; }

        [JsonProperty(PropertyName = "sort")]
        public int Sort { get; set; }
    }

    public class CategoryItem
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }

    public class LiveSession
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "startsAt")]
        public string StartsAt { get; set; }

        [JsonProperty(PropertyName = "endsAt")]
        public string EndsAt { get; set; }

        [JsonProperty(PropertyName = "watch")]
        public string Watch { get; set; }

        [JsonProperty(PropertyName = "speakers")]
        public List<Speaker> Speakers { get; set; }

    }

    public class OnDemandSession
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "watch")]
        public string Watch { get; set; }

        [JsonProperty(PropertyName = "speakers")]
        public List<Speaker> Speakers { get; set; }

    }

    public class ConferenceSchedule
    {
        public IEnumerable<LiveSession> LiveSessions;
        public IEnumerable<OnDemandSession> OnDemandSessions;
    }
}
