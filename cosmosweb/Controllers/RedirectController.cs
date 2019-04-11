using Microsoft.AspNetCore.Mvc;
using cosmosweb.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    [SitemapExclude]
    public class RedirectController : Controller
    {
        //[Route("/areas/azuread/pages/account/signedout")]
        //public IActionResult SignOut()
        //{
        //    return Redirect("/home/index");
        //}

        //[Route("test/dotnet-bounce")]
        //public IActionResult Test()
        //{
        //    return Redirect("http://dot.net/architecture");
        //}
    }
}