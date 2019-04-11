using Microsoft.AspNetCore.Mvc;
using cosmosweb.Helpers;
using cosmosweb.Models;
using cosmosweb.Services;
using Microsoft.AspNetCore.Authorization;

namespace cosmosweb.Areas.AzureAD.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        //[Route("azuread/account/signedout")]
        //public IActionResult SignedOut()
        //{
        //    return View("home/index");

        //}
    }
}