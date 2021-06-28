import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteDetailsComponent } from './components/tutorial-details/cliente-details.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'cliente/cadastrar', component: ClienteFormComponent },
  { path: 'cliente/alterar/:id', component: ClienteFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
