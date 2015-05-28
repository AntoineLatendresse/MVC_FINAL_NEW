using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using test.Models;



namespace test.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(String UserName, String Password)
        {
            Users users = new Users(Session["MainDB"]);
            if (users.Exist(UserName))
            {
                if (users.Password == Password)
                {
                    Session["UserValid"] = true;
                    Session["UserId"] = users.ID;
                    Session["Nom"] = users.Nom;
                    Session["Prenom"] = users.Prenom;
                    return RedirectToAction("Index", "Calendar");
                }
                else
                {
                    TempData["Notice"] = "Mot de passe incorrect...";
                }
            }
            else
                TempData["Notice"] = "Cet usager n'existe pas...";
            return View();
        }

        public ActionResult Gallery()
        {
            Gallery gal = new Gallery(Session["Gallery"]);
            gal.SelectAll();
            return View(gal);
        }


        public ActionResult Inscription()
        {
            return View(new Users());
        }

        [HttpPost]
        public ActionResult Inscription(Users newMember)
        {
            Session["insertionValide"] = false;
            
            if(ModelState.IsValid)
            {
                newMember.Insert();
                Session["insertionValide"] = true;
            }
            if (Session["insertionValide"].Equals(true))
            {
                Session["insertionValide"] = null;
                return Redirect("/Home/Index");
            }
            return View(newMember);
        }


        public ActionResult Subscribe()
        {
            return View();
        }



        [HttpPost]
        public ActionResult Subscribe(
            string Email,
            string UserName,
            string Prenom,
            string Nom = null,
            string Telephone = null,
            string Naissance = null,
            int Sexe = -1,
            string pathPicture = null)
        {
            Session["insertionValide"] = false;


            Users member = new Users();
            member.Email = Email;
            member.UserName = UserName;
            member.Prenom = Prenom;
            member.Nom = Nom;
            member.Telephone = Telephone;
            member.Naissance = DateTime.Parse(Naissance);
            member.Sexe = Sexe;


            if (Session["insertionValide"].Equals(true))
            {
                return Redirect("/Home/Index");
            }
            return View();
        }

        public ActionResult List()
        {
            Users users = new Users(Session["MainBD"]);
            users.SelectAll();
            return View(users);
        }

        /*[HttpPost]
        public ActionResult Login(string userName, string password)
        {
            UsersLogin connection = new UsersLogin();
            connection.UserName = userName;
            connection.Password = password;
            if(connection.Valider())
            {
                return Redirect("/Home/Index");
            }

            return View(userName, password);
        }*/


        public ActionResult Modify()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}