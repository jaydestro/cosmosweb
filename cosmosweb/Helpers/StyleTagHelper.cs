using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.Hosting;
using System;

namespace cosmosweb.Helpers
{
    [HtmlTargetElement("link", Attributes = "environmental")]
    public class StyleTagHelper : TagHelper
    {
        private bool _shouldMinify;
        public bool Environmental { get; set; }        

        public StyleTagHelper(IWebHostEnvironment env)
        {
            _shouldMinify = env.IsStaging() || env.IsProduction();
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (Environmental && _shouldMinify)
            {
                var href = output.Attributes["href"];
                var newHref = new TagHelperAttribute("href", href.Value.ToString().Replace(".css", ".min.css"));
                output.Attributes.SetAttribute(newHref);
            }
        }        
    }    
}