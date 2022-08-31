import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloggedGuard } from './core/guards/userlogged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./feature/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./feature/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'userlogged',
    loadChildren: () =>
      import('./feature/userlogged/userlogged.module').then(
        (m) => m.UserloggedModule
      ),
    canLoad: [UserloggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
