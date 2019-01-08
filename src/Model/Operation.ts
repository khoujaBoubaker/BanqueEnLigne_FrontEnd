import {Agence} from '../Model/Agence';
import {Compte} from '../Model/Compte';

export class Operation{

  numero:number;
  deateoperation:Date;
  montant:number;
  op:string="";
  agence:Agence;
  compteDebit:Compte;
  libelle:String="";
  soldeDuJour:number;




  constructor(){}
}
