using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using test.Models;

namespace MVC_TP_FINAL.Models
{
    public class UsersLogin
    {

        [Required]
        [Display(Name = "Nom d'utilisateur")]
        public string UserName { get; set; }

        [Required]
        [Display(Name= "Mot de passe")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool Valider()
        {
            Users member = new Users();
            member.UserName = UserName;
            member.Password = Password;

            if(member.ValiderConnexionUser())
            {
                return true;
            }
            return false;
        }
    }
}