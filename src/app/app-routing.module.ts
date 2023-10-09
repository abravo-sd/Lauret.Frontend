import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'dashboard'
    // },
    {
        path: '',
        loadChildren: () => import('./ui/dashboard/dashboard.module').then((m) => m.DashboardModule),
        // canActivate: [AuthGuard],
    },
    {
        path: 'login',
        loadChildren: () => import('./ui/auth/login/login.module').then((m) => m.LoginModule),
        // canActivate: [AuthGuard],
    },
    {
        path: 'unauthorized',
        loadChildren: () => import('./ui/auth/unauthorized/unauthorized.module').then((m) => m.UnauthorizedModule),
    },
    {
        path: 'buscador-evidencias',
        loadChildren: () =>
            import('src/app/ui/operations/pages/evidence-search-page/evidence-search-page.module').then(
                (m) => m.EvidenceSearchPageModule
            ),
    },
    {
        path: 'indicators-siac',
        loadChildren: () =>
            import('./ui/catalogs/pages/indicators-siac/indicators-siac.module').then((m) => m.IndicatorsSiacModule),
    },
    {
        path: 'evaluation-element',
        loadChildren: () =>
            import('./ui/catalogs/pages/evaluation-element/evaluation-element.module').then((m) => m.EvaluationElementModule),
    },
    { path: '**', redirectTo: '/login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
