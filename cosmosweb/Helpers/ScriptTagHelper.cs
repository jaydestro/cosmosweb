using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.Hosting;
using System;

namespace cosmosweb.Helpers
{
    [HtmlTargetElement("script", Attributes = "environmental")]
    public class ScriptTagHelper : TagHelper
    {
        private bool _shouldMinify;
        public bool Environmental { get; set; }        

        public ScriptTagHelper(IWebHostEnvironment env)
        {
            _shouldMinify = env.IsStaging() || env.IsProduction();
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (Environmental && _shouldMinify)
            {
                var src = output.Attributes["src"];
                var newSrc = new TagHelperAttribute("src", src.Value.ToString().Replace(".js", ".min.js"));
                output.Attributes.SetAttribute(newSrc);
            }
        }
    }
}