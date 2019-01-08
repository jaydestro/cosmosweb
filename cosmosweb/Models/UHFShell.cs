using Microsoft.AspNetCore.Html;

namespace cosmosweb.Models
{
    /// <summary>
    /// Content to be rendered for the Microsoft Universal Header & Footer (UHF) that is shown on all Microsoft websites
    /// </summary>
    public class UHFShell
    {
        public HtmlString CssIncludes { get; set; }
        public HtmlString JavaScriptIncludes { get; set; }
        public HtmlString HeaderHtml { get; set; }
        public HtmlString FooterHtml { get; set; }
    }
}
