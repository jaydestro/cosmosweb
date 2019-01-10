using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using cosmosweb.Models;
using System;
using System.Collections.Concurrent;
using System.Globalization;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace cosmosweb.Services
{
    /// <summary>
    /// Loads the content to be rendered for the Microsoft Universal Header & Footer (UHF) that is shown on all Microsoft websites
    /// </summary>
    public class UHFService
    {
        static int CacheInMinutes = 10;
        static int RetryInMinutes = 2;

        static string serviceEndpoint = "https://uhf.microsoft.com";
        static string partnerId = "Cosmos";
        static string headerId = "CosmosHeader-v1";
        static string footerId = "CosmosFooter";
        static string userAgent = "Microsoft";

        static ConcurrentDictionary<string, CachedObject<UHFShell>> uhfs = new ConcurrentDictionary<string, CachedObject<UHFShell>>();

        private readonly CookieConsentService _cookieConsentService;

        public UHFService(CookieConsentService cookieConsentService)
        {
            _cookieConsentService = cookieConsentService;
        }

        public UHFShell Load(HttpContext context)
        {
            var displayCookieConsentBanner = _cookieConsentService.IsConsentRequired(context);

            string cacheKey = "cache:" + CultureInfo.CurrentCulture.Name.ToLower() + " cookieBanner: " + displayCookieConsentBanner;

            var uhf = uhfs.GetOrAdd(cacheKey, new CachedObject<UHFShell>(TimeSpan.FromMinutes(CacheInMinutes), TimeSpan.FromMinutes(RetryInMinutes)));

            var cachedShell = uhf.GetOrCreateValue(() =>
            {
                var shell = GetData(CultureInfo.CurrentCulture.Name.ToLower(), displayCookieConsentBanner);
                return shell;
            });

            return cachedShell ?? new UHFShell();
        }

        private static UHFShell GetData(string locale, bool displayCookieConsentBanner)
        {
            var serviceUrl = serviceEndpoint + "/" + locale + "/shell/xml/" + partnerId + "?headerId=" + headerId + "&footerId=" + footerId;

            if (displayCookieConsentBanner)
            {
                serviceUrl += "&CookieComplianceEnabled=true";
            }

            return GetServiceData(serviceUrl).Result;
        }

        private static async Task<UHFShell> GetServiceData(string serviceUrl)
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.Timeout = TimeSpan.FromSeconds(5);

                using (HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, serviceUrl))
                {
                    requestMessage.Headers.Add("User-Agent", userAgent);

                    using (HttpResponseMessage response = await httpClient.SendAsync(requestMessage))
                    {
                        string xml = await response.Content.ReadAsStringAsync();
                        return ConvertXmlToModel(xml);
                    }
                }
            }
        }

        private static UHFShell ConvertXmlToModel(string xml)
        {
            var document = XDocument.Parse(xml);
            var root = document.Element("shell");

            return new UHFShell
            {
                CssIncludes = EnsureStringValue(root, "cssIncludes"),
                JavaScriptIncludes = EnsureStringValue(root, "javascriptIncludes"),
                FooterHtml = EnsureStringValue(root, "footerHtml"),
                HeaderHtml = EnsureStringValue(root, "headerHtml"),
            };
        }

        private static HtmlString EnsureStringValue(XElement root, string elementName)
        {
            var element = root.Element(elementName);
            return new HtmlString(element != null ? (string)element : string.Empty);
        }
    }
}
