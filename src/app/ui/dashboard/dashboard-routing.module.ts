import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from 'src/app/shared/guards';
import { RolesGuard } from 'src/app/shared/guards/roles/roles.guard';
import { SyncGuardHelper } from 'src/app/shared/guards/sync-guard-helper/sync-guard-helper.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        // canActivate: [SyncGuardHelper],
        data: {
            syncGuards: [AppGuard, RolesGuard],
        },
        children: [
            {
                path: 'catalogo',
                loadChildren: () => import('src/app/ui/catalogs/catalogs.module').then((m) => m.CatalogsModule),
            },
            {
                path: 'configuracion',
                loadChildren: () =>
                    import('src/app/ui/configurations/configurations.module').then((m) => m.ConfigurationsModule),
            },
            {
                path: 'operacion',
                loadChildren: () => import('src/app/ui/operations/operations.module').then((m) => m.OperationsModule),
            },
            {
                path: 'reportes',
                loadChildren: () => import('src/app/ui/reports/reports.module').then((m) => m.ReportsModule),
                // canActivate: [SyncGuardHelper],
                data: {
                    syncGuards: [AppGuard, RolesGuard],
                }
            },
            {
                path: 'metas-resultados',
                loadChildren: () =>
                    import('src/app/ui/capturing-goals-and-results/capturing-goals-and-results.module').then(
                        (m) => m.CapturingGoalsAndResultsModule
                    )
            },
            {
                path: 'carga-evidencias',
                loadChildren: () =>
                    import('src/app/ui/upload-evidences/upload-evidences.module').then((m) => m.UploadEvidencesModule),
            },
            {
                path: 'ejecucion-autoevaluacion',
                loadChildren: () =>
                    import('src/app/ui/self-assessment-execution/self-assessment-execution.module').then(
                        (m) => m.SelfAssessmentExecutionModule
                    )
            },
            {
                path: 'plan-mejora',
                loadChildren: () =>
                    import('src/app/ui/improvement-plan/improvement-plan.module').then((m) => m.ImprovementPlanModule),
            },
            {
                path: 'revision-autoevaluacion',
                loadChildren: () =>
                    import('src/app/ui/self-assessment-review/self-assessment-review.module').then(
                        (m) => m.SelfAssessmentReviewModule
                    )
            },
            { path: 'auditoria', loadChildren: () => import('src/app/ui/audit/audit.module').then((m) => m.AuditModule) },
            {
                path: 'reporte-seguimiento',
                loadChildren: () =>
                    import('src/app/ui/reports-and-monitoring/reports-and-monitoring.module').then(
                        (m) => m.ReportsAndMonitoringModule
                    )
            },
            {
                path: 'mi-perfil',
                loadChildren: () => import('src/app/ui/my-profile/my-profile.module').then((m) => m.MyProfileModule)
            },
            // {
            //     path: 'welcome-settings',
            //     loadChildren: () =>
            //         import('src/app/settings/welcome-screen/settingsWelcome.module').then((m) => m.SettingsWelcomeRecordModule),
            // },
            // {
            //     path: 'welcome',
            //     loadChildren: () =>
            //       import('src/app/ui/catalogs/pages/settings-welcome/settings-welcome.module').then(
            //         (m) => m.SettingsWelcomeModule
            //       ),
            //   },
            {
                path: 'welcome-screen',
                loadChildren: () =>
                    import('src/app/ui/welcome-screen/welcome-screen.module').then(
                        (m) => m.WelcomeScreenModule
                    )
            },
            {
                path: 'welcome-settings',
                loadChildren: () =>
                    import('src/app/ui/welcome-settings/welcome-settings-record.module').then(
                        (m) => m.WelcomeSettingsRecordModule
                    )
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
