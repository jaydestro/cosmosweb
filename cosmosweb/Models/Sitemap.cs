using System;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace cosmosweb.Models
{
    [XmlRoot("urlset", Namespace = "http://www.sitemaps.org/schemas/sitemap/0.9")]
    public class Sitemap
    {
        [XmlElement("url")]
        public List<SiteUrl> Pages { get; set; }

        public class SiteUrl
        {
            [XmlElement("loc")]
            public string URL { get; set; }

            [XmlElement("lastmod")]
            public DateTime? LastModified { get; set; }

            public bool ShouldSerializeLastModified() => LastModified.HasValue;
        }
    }
}
