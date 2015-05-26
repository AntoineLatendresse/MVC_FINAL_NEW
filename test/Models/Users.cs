using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Linq;
using System.Web;

namespace test.Models
{
    public class Users : test.Class.SqlExpressWrapper
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Le prenom est obligatoire")]
        public string Prenom { get; set; }
        [Required(ErrorMessage = "Le nom est obligatoire")]
        public string Nom { get; set; }
        public string Telephone { get; set; }
        [Display(Name = "Code Postal")]
        public string CodePostal { get; set; }
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
            Id = int.Parse(this["ID"]);
            Prenom = this["Prenom"];
            Nom = this["Nom"];
            Telephone = this["Telephone"];
            CodePostal = this["CodePostal"];
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
            InsertRecord(Prenom, Nom, Telephone, CodePostal, Naissance, Sexe, EtatCivil, Picture);
        }
        public override void Update()
        {
            UpdateRecord(Id, Prenom, Nom, Telephone, CodePostal, Naissance, Sexe, EtatCivil, Picture);
        }
    }
}