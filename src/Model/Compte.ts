import {Client} from '../Model/Client';

export class Compte{

  idcpt:number;
  solde:number;
  decouvert:number;
  datedecreation:Date;
  numeroCompte:string="";
  client:Client;



  constructor(){}
}
