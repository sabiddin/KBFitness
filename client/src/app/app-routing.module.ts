import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChipsComponent } from './chips/chips.component';
import { FlexComponent } from './flex/flex.component';
import { FormComponent } from './form/form.component';
import { GridComponent } from './grid/grid.component';
import { ProductsComponent } from './products/products.component';
import { SliderComponent } from './slider/slider.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'chips', component: ChipsComponent },
  { path: 'grid', component: GridComponent },
  { path: 'form', component: FormComponent },
  { path: 'flex', component: FlexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
