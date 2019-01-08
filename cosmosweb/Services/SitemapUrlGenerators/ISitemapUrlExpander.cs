using System.Collections.Generic;

namespace cosmosweb.Services.SitemapUrlGenerators
{
    /// <summary>
    /// Generates the actual URLs for an action based on the template URL.
    /// Typically used where an action accepts parameters, and therefore represents multiple URLs.
    /// </summary>
    public interface ISitemapUrlExpander
    {
        IEnumerable<string> Expand(string urlTemplate);
    }
}
