import {AppComponent} from './app.component';
import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { ProfilpersonnelComponent } from './profilpersonnel/profilpersonnel.component';
import { ListeAdministrateursComponent } from './liste-administrateurs/liste-administrateurs.component';
import { AgenceComponent } from './agence/agence.component';
import {AgenceService} from '../services/AgenceService';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule, MatTooltip} from '@angular/material';
import { NouveauClientComponent } from './nouveau-client/nouveau-client.component';
import { ListedesclientsComponent } from './listedesclients/listedesclients.component';
import { OperationsComponent } from './operations/operations.component';
import { NewClComponent } from './new-cl/new-cl.component';
import { NouveauFormulaireComponent } from './nouveau-formulaire/nouveau-formulaire.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {ModalModule} from 'ngx-bootstrap';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {SelectModule} from 'ng-select';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalendarModule } from 'angular-calendar';
import  'rxjs/symbol/observable';

import 'rxjs/add/observable/throw';
import { ConseillersComponent } from './conseillers/conseillers.component';
import { ProfileConseillerComponent } from './profile-conseiller/profile-conseiller.component';

import {EventService} from '../services/EventService';


import { CalendarComponent } from './calendar/calendar.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import { NavComponenetComponent } from './nav-componenet/nav-componenet.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { NouveauConseillerComponent } from './nouveau-conseiller/nouveau-conseiller.component';
import {ConseillersAgence} from '../services/ConseillersAgence';
import { NouvelleAgenceComponent } from './nouvelle-agence/nouvelle-agence.component';
import { HomComponent } from './hom/hom.component';

import {AuthguardService} from '../services/AuthguardService';
import { RegisterComponent } from './register/register.component';
import {administrationService} from '../services/administrationService';

import {ToastModule} from 'ng2-toastr';

import { FooterComponent } from './footer/footer.component';
import {AgenceConseillersService} from '../services/AgenceConseillersService';
import { ModificationClientComponent } from './modification-client/modification-client.component';
import { ListComptesComponent } from './list-comptes/list-comptes.component';

import { ModificationConseillerComponent } from './modification-conseiller/modification-conseiller.component';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {SweetAlert} from 'sweetalert/typings/core';
import { EditagenceComponent } from './editagence/editagence.component';
import {urlPermission} from '../urlPermission/urlPermission';
import {AuthenticationServicee} from '../services/AuthenticationServicee';
import { DashBoardComponent } from './dash-board/dash-board.component';
import {ChiffreAffiareService} from '../services/ChiffreAffiareService';


import { GraphiqueComponent } from './graphique/graphique.component';
import {GrapheService} from '../services/GrapheService';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule,MatMenuModule,MatToolbarModule,MatIconModule} from '@angular/material';
import {MatButtonModule,PageEvent} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import { LogComponent } from './log/log.component';
import {MatProgressBarModule} from '@angular/material';
declare var $:any;

import {NgProgressModule} from 'ngx-progressbar';
import {ConnectionService} from '../services/ConnectionService';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileCpComponent } from './profile-cp/profile-cp.component';
import { SimulateurCreditComponent } from './simulateur-credit/simulateur-credit.component';
import {CreditService} from '../services/CreditService';
import { NouveauCreditComponent } from './nouveau-credit/nouveau-credit.component';



const appRoutes: Routes = [




  {path:'login',component:LogComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  { path: 'home', component: HomComponent,
    children: [

      {path: '', redirectTo: 'login', pathMatch: 'full' },
      {path:'NouveauConseiller',component:NouveauConseillerComponent},
      {path:'NouveauClient',component:NouveauClientComponent},
      {path:'clients',component:ListedesclientsComponent},
      {path:'editagence/:id',component:EditagenceComponent},
      {path:'SimulateurCredit',component:SimulateurCreditComponent},
      {path:'Profile/:id',component:UserProfileComponent},
      {path:'EditClient/:id',component:ModificationClientComponent},
      {path:'EditConseiller/:id',component:ModificationConseillerComponent},
      {path:'MesComptes/:id',component:ListComptesComponent},
      {path:'conseillers',component:ConseillersComponent},
      {path:'NouvelleAgence',component:NouvelleAgenceComponent},
      {path:'Agences',component:AgenceComponent},
      {path:'Calendrier',component:CalendarComponent},
      {path:'Agences',component:AgenceComponent},
      {path:'graphique',component:GraphiqueComponent},
      {path:'SimulerCredit/:id',component:NouveauCreditComponent}

    ] }];




@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ProfilpersonnelComponent,
    ListeAdministrateursComponent,
    AgenceComponent,
    NouveauClientComponent,
    ListedesclientsComponent,
    OperationsComponent,
    NewClComponent,
    NouveauFormulaireComponent,
    DashboardComponent,
    ConseillersComponent,
    ProfileConseillerComponent,
    CalendarComponent,

    NavComponenetComponent,
    AppheaderComponent,
    NouveauConseillerComponent,
    NouvelleAgenceComponent,
    HomComponent,

    RegisterComponent,
    FooterComponent,
    ModificationClientComponent,
    ListComptesComponent,

    ModificationConseillerComponent,
    EditagenceComponent,
    GraphiqueComponent,
    LogComponent,
    UserProfileComponent,
    ProfileCpComponent,
    SimulateurCreditComponent,
    NouveauCreditComponent,







  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    ReactiveFormsModule,
    FullCalendarModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    SelectDropDownModule,
    SelectModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    NgProgressModule,

MatButtonModule,
MatMenuModule,
MatCardModule,MatToolbarModule,MatIconModule,MatDividerModule
  ],
  bootstrap: [AppComponent],
  providers:[AgenceService,EventService,administrationService,AuthenticationServicee,ChiffreAffiareService,GrapheService,ConnectionService,CreditService],
  exports:[TooltipModule,ModalModule,MatSelectModule]

})
export class AppModule{

}
