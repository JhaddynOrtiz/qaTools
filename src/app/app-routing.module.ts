import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputConverterComponent } from './components/input-converter/input-converter.component';

const routes: Routes = [
  { path: 'updater-inputs', component: InputConverterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
