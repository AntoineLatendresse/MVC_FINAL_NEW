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
        public ActionResult Index(UsersLogin loginUser)
        {
            Users users = new Users();
            if (loginUser.Valider())
            {
                users.SelectByFieldName("UserName", loginUser.UserName);
                Session["user"] = users;
                Users test = Session["user"] as Users;
                int i = test.ID;

                Session["UserValid"] = true;
                Session["UserId"] = users.ID;
                Session["Nom"] = users.Nom;
                Session["Prenom"] = users.Prenom;
                Session["Picture"] = users.Picture;
                return RedirectToAction("Index", "Calendar");
            }
            return View(loginUser);
        }

        public ActionResult Gallery()
        {
            Gallery gal = new Gallery();
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


        public ActionResult List()
        {
            Users users = new Users();
            users.SelectAll();
            return View(users);
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(UsersLogin usersConnection)
        {
            
            if(usersConnection.Valider())
            {
                return Redirect("/Home/List");
            }

            return View(usersConnection);
        }



        public ActionResult Subscribe()
        {
            return View();
        }



        [HttpPost]
        public ActionResult Subscribe(Users member)
        {
            Session["insertionValide"] = false;

            if (Session["insertionValide"].Equals(true))
            {
                return Redirect("/Home/Index");
            }
            return View(member);
        }


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