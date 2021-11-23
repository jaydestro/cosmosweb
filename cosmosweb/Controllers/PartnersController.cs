using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using cosmosweb.Services;
using System.Threading.Tasks;
using cosmosweb.Models;

namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class PartnersController : Controller
    {
        PartnerSession fetchSessionService = new PartnerSession();

        PartnerSessionSchedule PartnerTechSchedule;

        private void LoadSessions()
        {
            PartnerTechSchedule = fetchSessionService.GetPartnerSessions();
        }

        [Route("partners")]
        public async Task<IActionResult> Index()
        {
            return View("Index");
        }


        [Route("partners/partnertechconnect")]
        public async Task<IActionResult> PartnerTechConnect()
        {
            return View("PartnerTechConnect");
        }

        [Route("partners/partnertechconnect/sessions")]
        public async Task<IActionResult> Sessions()
        {
            if (PartnerTechSchedule == null)
                LoadSessions();
            return View("Sessions", PartnerTechSchedule.partnerSessions);
        }

        [Route("partners/partnertechconnect/qna")]
        public async Task<IActionResult> QnA()
        {
            if (PartnerTechSchedule == null)
                LoadSessions();
            return View("QnA", PartnerTechSchedule.qnaSessions);
        }

        [Route("partners/tools")]
        public async Task<IActionResult> Tools()
        {
            return View("Tools");
        }

        [Route("partners/updates")]
        public async Task<IActionResult> Updates()
        {
            return View("Updates");
        }
    }
}
