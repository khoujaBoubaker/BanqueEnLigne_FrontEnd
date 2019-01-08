import {Agence} from './Agence';

export class Client{
  idclient:number=0;
  nom:string="";
  prenom:string="";
  addresse:string="";
  email:string="";
  salaire:number=0;
  datedenaissance:Date;
  DateDeCreation:Date;
  agence:Agence;
  comptes:any;


  constructor(){}
}
