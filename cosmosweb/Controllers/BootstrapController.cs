using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class BootstrapController : Controller
    {
        public BootstrapController(IConfiguration configuration) => _configuration = configuration;

        private IConfiguration _configuration;

        //[HttpGet]
        //[Route("bootstrap")]
        //public IActionResult Index()
        //{
        //    return View();
        //}

        //[HttpPost]
        //[Route("bootstrap")]
        //public async Task<IActionResult> Submit(NominationData nominationData)
        //{
        //    var sendGridClient = new SendGridClient(_configuration.GetValue<string>("SendGrid_ApiKey"));
        //    var message = new SendGridMessage();
        //    message.SetFrom(new EmailAddress("no-reply@cosmosdb.ms", "Cosmos Web"));
        //    var recipients = _configuration.GetValue<string>("Bootstrap_SendToAddress").Split(';');
        //    foreach (var recipient in recipients)
        //    {
        //        message.AddTo(new EmailAddress(recipient));
        //    }
        //    message.SetSubject("New Cosmos Bootstrap nomination!");
        //    message.AddContent("text/html", $"Name: {nominationData.Name}<br/>Email Address: {nominationData.EmailAddress}<br/>Workload Details: {nominationData.WorkloadDetails}");

        //    var result = await sendGridClient.SendEmailAsync(message);
        //    var body = await result.Body.ReadAsStringAsync();

        //    return View("Index", new NominationViewModel { NominationSubmitted = true });
        //}

        public class NominationViewModel
        {
            public bool NominationSubmitted { get; set; }
        }

        public class NominationData
        {
            [Required]
            public string Name { get; set; }
            [Required]
            [EmailAddress]
            public string EmailAddress { get; set; }
            [Required]
            public string WorkloadDetails { get; set; }
        }
    }
}
