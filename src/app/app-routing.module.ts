import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputConverterComponent } from './components/input-converter/input-converter.component';
import { LoginComponent } from './components/login/login.component';
import { ProductionTaskListComponent } from './components/production-task-list/production-task-list.component';
import { HomeComponent } from './components/home/home.component';
import { ComparerComponent } from './components/comparer/comparer.component';
import { ValidationComponent } from './components/validation/validation.component';
import { DeployComponent } from './components/deploy/deploy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'convert', component: InputConverterComponent },
  { path: 'comparer', component: ComparerComponent },
  { path: 'validation', component: ValidationComponent },
  { path: 'deploy', component: DeployComponent },
  { path: 'login', component: LoginComponent },
  { path: 'production-list', component: ProductionTaskListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
