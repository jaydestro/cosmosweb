
namespace cosmosweb.Helpers
{
    public class LinkManager
    {
        //Putting this class on back burner. Not sure it's worth extracting every URL into a single class as there is little re-use across the site.
        private static readonly string CONCEPTUAL_GLOBAL_DIST_OVERVIEW = "https://docs.microsoft.com/azure/cosmos-db/distribute-data-globally";
        
        public string GlobalDistribution => CONCEPTUAL_GLOBAL_DIST_OVERVIEW;
    }
}
