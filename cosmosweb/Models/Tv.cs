using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cosmosweb.Models
{
    public class Tv
    {
        public Episode NextEpisode;
        public IEnumerable<Episode> UpcomingEpisodes;
        public IEnumerable<Episode> PastEpisodes;
    }
}
