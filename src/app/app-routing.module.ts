import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'forgetpassword',
    loadChildren: () =>
      import('./pages/forgetpassword/forgetpassword.module').then(
        (m) => m.ForgetpasswordPageModule
      ),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'comandas',
    loadChildren: () =>
      import('./pages/comandas/comandas.module').then(
        (m) => m.CuentaPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'cobrar',
    loadChildren: () =>
      import('./pages/cobrar/cobrar.module').then((m) => m.CobrarPageModule),
  },
  {
    path: 'factura',
    loadChildren: () =>
      import('./pages/factura/factura.module').then((m) => m.FacturaPageModule),
  },
  {
    path: 'cobros',
    loadChildren: () =>
      import('./pages/cobros/cobros.module').then((m) => m.CobrosPageModule),
  },
  {
    path: 'pdf-viewer',
    loadChildren: () =>
      import('./pages/pdf-viewer/pdf-viewer.module').then(
        (m) => m.PdfViewerPageModule
      ),
  },
  {
    path: 'pdf-viewer-factura',
    loadChildren: () =>
      import('./pages/pdf-viewer-factura/pdf-viewer-factura.module').then(
        (m) => m.PdfViewerFacturaPageModule
      ),
  },
  {
    path: 'mesas',
    loadChildren: () =>
      import('./pages/mesas/mesas.module').then((m) => m.MesasPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
