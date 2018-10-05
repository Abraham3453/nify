import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalsProvider {

  variables: object = {};

  constructor(
    
  ) {

    this.variables = {
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
      }
    }
    console.log('Hello GlobalsProvider Provider');
  }

}
