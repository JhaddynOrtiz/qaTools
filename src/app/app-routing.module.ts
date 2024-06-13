import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputConverterComponent } from './components/input-converter/input-converter.component';
import { LoginComponent } from './components/login/login.component';
import { ProductionTaskListComponent } from './components/production-task-list/production-task-list.component';

const routes: Routes = [
  { path: '', component: InputConverterComponent },
  { path: 'convert', component: InputConverterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'production-list', component: ProductionTaskListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
