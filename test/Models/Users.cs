using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Linq;
using System.Web;

namespace MVC_TP_FINAL.Models
{
    public class Users : test.Class.SqlExpressWrapper
    {
        public int ID { get; set; }

        [Display(Name = "Adresse email")]
        [Required(ErrorMessage = "L'adresse email est nécessaire à la création d'un compte.")]
        [EmailAddress(ErrorMessage = "L'adresse email entrée n'est pas une adresse valide.")]
        public string Email { get; set; }

        [Display(Name = "Nom d'utilisateur")]
        [Required(ErrorMessage = "Vous devez avoir un nom d'utilisateur.")]
        [StringLength(20, MinimumLength = 2)]
        public string UserName { get; set; }

        [Display(Name = "Mot de passe")]
        [Required(ErrorMessage = "Vous devez avoir mot de passe")]
        [StringLength(30, MinimumLength = 8)]
        public string Password { get; set; }

        [Display(Name = "Prenom")]
        [Required(ErrorMessage = "Le prenom est obligatoire")]
        [StringLength(20, MinimumLength = 2)]
        public string Prenom { get; set; }

        [Display(Name = "Nom")]
        [Required(ErrorMessage = "Le nom est obligatoire")]
        [StringLength(20, MinimumLength = 2)]
        public string Nom { get; set; }

        [Display(Name = "Numéro de téléphone")]
        [StringLength(20, MinimumLength = 2)]
        public string Telephone { get; set; }

        [Display(Name = "Date de naissance")]
        [DataType(DataType.Date, ErrorMessage = "Pas une date valide")]
        public DateTime Naissance { get; set; }


        public int Sexe { get; set; }

        [Display(Name = "État Civil")]
        public int EtatCivil { get; set; }


        public string Picture { get; set; }


        public Users(Object connexionString)
            : base(connexionString)
        {
            SQLTableName = "USERS";
        }

        public Users()
            : base("")
        {
        }
        public override void GetValues()
        {
            ID = int.Parse(this["ID"]);
            Email = this["Email"];
            UserName = this["UserName"];
            Password = this["Password"];
            Prenom = this["Prenom"];
            Nom = this["Nom"];
            Telephone = this["Telephone"];
            Naissance = DateTime.Parse(this["Naissance"]);
            Sexe = int.Parse(this["Sexe"]);
            EtatCivil = int.Parse(this["EtatCivil"]);
            Picture = this["Picture"];
        }

        public String GetAvatarURL()
        {
            String url;
            if (String.IsNullOrEmpty(Picture))
            {
                url = @"Images/anonymous.jpg";
            }
            else
            {
                url = @"Images/" + Picture + ".jpg";
            }

            return url;
        }

        public override void Insert()
        {
            InsertRecord(Email, UserName, Password, Prenom, Nom, Telephone, Naissance, Sexe, EtatCivil, Picture);
        }
        public override void Update()
        {
            UpdateRecord(ID, Email, UserName, Password, Prenom, Nom, Telephone, Naissance, Sexe, EtatCivil, Picture);
        }
    }
}