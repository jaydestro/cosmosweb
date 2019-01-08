using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace cosmosweb.Helpers
{
    public class AppOfflineMiddleware
    {
        private bool _fileExist;
        private string _fileContents;
        private readonly RequestDelegate _next;

        public AppOfflineMiddleware(RequestDelegate next, IHostingEnvironment env)
        {
            if (next == null)
            {
                throw new ArgumentNullException(nameof(next));
            }
            _next = next;
            var filePath = env.WebRootPath + "\\App_Offline.htm";
            _fileExist = File.Exists(filePath);
            if (_fileExist)
            {
                _fileContents = File.ReadAllText(filePath);
            }
        }

        public async Task Invoke(HttpContext context)
        {
            if (_fileExist)
            {
                context.Response.ContentType = "text/html";
                await context.Response.WriteAsync(_fileContents);
                return;
            }
            await _next(context);
        }
    }

    public static class AppOfflineExtensions
    {
        public static IApplicationBuilder UseAppOffline(this IApplicationBuilder app)
        {
            return app.UseMiddleware<AppOfflineMiddleware>();
        }
    }


}
