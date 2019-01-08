using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using cosmosweb.Helpers;
using cosmosweb.Models;
using cosmosweb.Services.SitemapUrlGenerators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using Microsoft.Extensions.Logging;

namespace cosmosweb.Services
{
    public class SitemapService
    {
        private const string LIVE_SITE_BASE_URL = "https://gotcosmos.com"; //"https://www.microsoft.com/net";
        private IActionDescriptorCollectionProvider _actions;
        private readonly IServiceProvider _services;
        private Lazy<Sitemap> _siteMap;
        private readonly ILogger _logger;

        public SitemapService(IActionDescriptorCollectionProvider actions, IServiceProvider services, ILogger<SitemapService> logger)
        {
            _actions = actions;
            _services = services;
            _logger = logger;

            _siteMap = new Lazy<Sitemap>(() => BuildSitemap());
        }

        public string LiveSiteBaseUrl => LIVE_SITE_BASE_URL;

        public Sitemap Sitemap => _siteMap.Value;

        private Sitemap BuildSitemap()
        {
            var result = new Sitemap
            {
                Pages = _actions.ActionDescriptors.Items
                    .OfType<ControllerActionDescriptor>()
                    .Where(a => !a.MethodInfo.GetCustomAttributes<SitemapExcludeAttribute>().Any())
                    .Where(a => !a.ControllerTypeInfo.GetCustomAttributes<SitemapExcludeAttribute>().Any())
                    .Select(a => new { Action = a, TemplateUrl = BuildTemplateUrl(a) })
                    .SelectMany(a => ExpandTemplateUrl(a.TemplateUrl, a.Action, _services))
                    .Select(u => new Sitemap.SiteUrl { URL = u.ToLowerInvariant() })
                    .ToList()
            };

            foreach (var page in result.Pages.Where(p => p.URL.Contains("{") || p.URL.Contains("}")))
            {
                _logger.LogWarning($"A page is being added to the sitemap that still has placeholders in the URL ({page.URL}). Use {nameof(SitemapUrlExpanderAttribute)} on the action to replace the placeholder with actual values.");
            }

            return result;
        }

        private static IEnumerable<string> ExpandTemplateUrl(string templateUrl, ControllerActionDescriptor action, IServiceProvider services)
        {
            var expanderAttribute = action.MethodInfo.GetCustomAttributes<SitemapUrlExpanderAttribute>().SingleOrDefault();
            if (expanderAttribute == null)
            {
                yield return templateUrl;
            }
            else
            {
                var expander = (ISitemapUrlExpander)services.GetService(expanderAttribute.ValueGenerator);
                if (expander == null)
                {
                    throw new ArgumentException($"Failed to resolve {expanderAttribute.ValueGenerator.Name} from dependency injection. Ensure that {expanderAttribute.ValueGenerator.Name} is added to the ServiceCollection in Startup.cs.");
                }

                foreach (var newurl in expander.Expand(templateUrl))
                {
                    yield return newurl;
                }
            }
        }

        private static string BuildTemplateUrl(ControllerActionDescriptor action)
        {
            var url = new StringBuilder(LIVE_SITE_BASE_URL);
            if (action.AttributeRouteInfo != null)
            {
                url.Append("/");
                url.Append(action.AttributeRouteInfo.Template);
            }
            else
            {
                if (action.RouteValues["controller"] != "Home")
                {
                    url.Append("/");
                    url.Append(action.RouteValues["controller"]);
                }

                if (action.RouteValues["action"] != "Index")
                {
                    url.Append("/");
                    url.Append(action.RouteValues["action"]);
                }

                foreach (var parameter in action.Parameters)
                {
                    url.Append("/{");
                    url.Append(parameter.Name);
                    if (!parameter.ParameterType.IsValueType || Nullable.GetUnderlyingType(parameter.ParameterType) != null)
                    {
                        url.Append("?");
                    }
                    url.Append("}");
                }
            }

            return url.ToString(); ;
        }
    }
}
