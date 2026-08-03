import { Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard';
import {LoginComponent} from './components/login/login';
import {ParticipantListComponent} from './components/participant-list/participant-list';
import {FormateurListComponent} from './components/formateur-list/formateur-list';
import {CycleListComponent} from './components/cycle-list/cycle-list';
import {RegisterComponent} from './components/register/register';
import {EspaceParticipantComponent} from './components/espace-participant/espace-participant';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'participants', component: ParticipantListComponent},
  {path: 'menu', component: DashboardComponent},
  {path: 'formateurs', component: FormateurListComponent},
  {path: 'cycles', component: CycleListComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'participant-dashboard', component: EspaceParticipantComponent }
];
