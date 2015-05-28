using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace test.Models
{
   public class UsersInscription
   {
      public int ID { get; set; }

      [Display(Name = "Adresse email")]
      [Required(ErrorMessage = "L'adresse email est nécessaire à la création d'un compte.")]
      [EmailAddress(ErrorMessage = "L'adresse email entrée n'est pas une adresse valide.")]
      public string Email { get; set; }

      [Display(Name = "Nom d'utilisateur")]
      [Required(ErrorMessage = "Vous devez avoir un nom d'utilisateur.")]
      [StringLength(20, MinimumLength = 2, ErrorMessage = "Le nom d'utilisisateur doit avoir un minimum de deux charatères")]
      public string UserName { get; set; }


      [Display(Name = "Mot de passe")]
      [Required(ErrorMessage = "Vous devez avoir un mot de passe")]
      [StringLength(30, MinimumLength = 8, ErrorMessage = "Votre mot de passe doit avoir au moins 8 charactères")]
      [DataType(DataType.Password)]
      public string Password { get; set; }


      [Display(Name = "Prenom")]
      [Required(ErrorMessage = "Le prenom est obligatoire")]
      [StringLength(20)]
      public string Prenom { get; set; }

      [Display(Name = "Nom de famille")]
      [StringLength(20)]
      public string Nom { get; set; }
   }
}