import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalsProvider {

  variables: any = {
    langage: {
      fr: {
        marhaba: "Bienvenue chez DentArt",
        caccbtn: "Créer un compte",
        login: "Connexion"
      },
      en: {
        marhaba: "Welcome to DentArt",
        caccbtn: "Create an account",
        caccsup: "Sing up",
        login: "Log in",
        singin: "Sing in"
      }
    },
    urls: {
      createAccountURL: 'http://dentart.devforge.eu/ws-inscription/',
      loginURL: 'http://dentart.devforge.eu/ws-connexion/',
      editProfilURL: 'http://dentart.devforge.eu/ws-edit-profil/',
      checkMailURL: 'http://dentart.devforge.eu/ws-check-email/',
      checkPseudoURL: 'http://dentart.devforge.eu/ws-check-pseudo/',
      listFaQ: 'http://dentart.devforge.eu/ws-list-faqs/',
      listFaQTheme: 'http://dentart.devforge.eu/ws-list-faq-themes/',
      addFaQ: 'http://dentart.devforge.eu/ws-add-faq/',
      addCommentFaQ: 'http://dentart.devforge.eu/ws-add-faq-comment/',
      addFavoriteFaQ: 'http://dentart.devforge.eu/ws-add-favorite/',
      getFavoriteFaq: 'http://dentart.devforge.eu/ws-get-favorite/',
      uploadFaQImg: 'http://dentart.devforge.eu/ws-add-image-faq/',
      getUserInfo: 'http://dentart.devforge.eu/ws-get-profile/',
      addFavorite: 'http://dentart.devforge.eu/ws-add-favorite/',
      listAnnonceCat: 'http://dentart.devforge.eu/ws-list-annonce-categories/',
      addAnnonce: 'http://dentart.devforge.eu/ws-add-annonce/',
      uploadAnnonceIMG: 'http://dentart.devforge.eu/ws-add-image-annonce/',
      listAnnonce: 'http://dentart.devforge.eu/ws-list-annonces/'
    }
  };

  constructor(
    
  ) {
    console.log('Hello GlobalsProvider Provider');
  }

}
