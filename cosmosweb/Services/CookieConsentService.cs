using Microsoft.AspNetCore.Http;
using Microsoft.CookieCompliance;
using Microsoft.CookieCompliance.NetCore;
using Microsoft.CookieCompliance.NetCore.IPAddressResolver;
using Microsoft.CookieCompliance.NetStd;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace cosmosweb.Services
{
    public class CookieConsentService : IDisposable
    {
        private readonly ILogger _logger;
        private const string _domainName = "microsoft.com";
        private readonly ICookieConsentClient _cookieConsentClient;
        private readonly IPAddressResolver _ipAddressResolver;
        private bool _isDisposed = false;

        public CookieConsentService(ILogger<CookieConsentService> logger)
        {
            _logger = logger;
            _cookieConsentClient = CookieConsentClientFactory.Create(_domainName, logger);
            _ipAddressResolver = IPAddressResolverFactory.Create(_domainName, logger);
        }

        public bool IsConsentRequired(HttpContext context)
        {
            try
            {
                var countryCode = GetCountryCode(context);

                return string.IsNullOrWhiteSpace(countryCode)
                    ? false
                    : _cookieConsentClient.IsConsentRequiredForRegion(_domainName, countryCode, context) == ConsentStatus.Required;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private string GetCountryCode(HttpContext context)
        {
            // Passing via URL allows us to validate without having to change headers or IP resolution code
            var urlParameter = context.Request.Query["country"].FirstOrDefault();
            if (!string.IsNullOrWhiteSpace(urlParameter))
            {
                return urlParameter;
            }
            
            // This header is set (by microsoft.com infrastructure) when the site is accessed via a microsoft.com URL
            // var header = context.Request.Headers["X -Akamai-Edgescape"].FirstOrDefault();
            // if (!string.IsNullOrWhiteSpace(header))
            // {
                // var start = header.IndexOf("country_code=");
                // if (start >= 0 && header.Length >= start + 15)
                // {
                    // return header.Substring(start + 13, 2);
                // }
            // }

            var ip = context.Connection.RemoteIpAddress.ToString();

            var forwaredFor = context.Request.Headers["X-Forwarded-For"].FirstOrDefault();
            if (!string.IsNullOrWhiteSpace(forwaredFor))
            {
                ip = forwaredFor.Split(',').FirstOrDefault().Trim();
            }

            _logger.LogInformation(string.Format("CookieConsentService: ip: " + ip));

            foreach(var header in context.Request.Headers)
            {
                _logger.LogInformation(string.Format(header.Key + ": " + header.Value));
            }

            return _ipAddressResolver.GetCountryCode(ip);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_isDisposed)
            {
                if (disposing)
                {
                    _cookieConsentClient.Dispose();
                    _ipAddressResolver.Dispose();
                }

                _isDisposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
        }
    }
}
