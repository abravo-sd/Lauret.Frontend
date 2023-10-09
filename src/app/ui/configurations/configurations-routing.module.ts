import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';

const routes: Routes = [
    {
        path: '',
        component: ConfigurationsComponent,
        //TODO: VALIDAR ROLES
        //canActivate: [RolesGuard],
        children: [
            {
                path: 'elemento-evaluacion',
                loadChildren: () =>
                    import('./pages/evaluation-element/evaluation-element.module').then((m) => m.EvaluationElementModule),
            },
            {
                path: 'configuracion-general',
                loadChildren: () =>
                    import('./pages/general-configuration/general-configuration.module').then(
                        (m) => m.GeneralConfigurationModule
                    ),
            },
            {
                path: 'indicadores-siac',
                loadChildren: () => import('./pages/indicators/indicators.module').then((m) => m.IndicatorsModule),
            },
            {
                path: 'escala-medicion',
                loadChildren: () =>
                    import('./pages/measurement-scale/measurement-scale.module').then((m) => m.MeasurementScaleModule),
            },
            {
                path: 'proceso-copiado',
                loadChildren: () => import('./pages/copy-process/copy-process.module').then((m) => m.CopyProcessModule),
            },
            {
                path: 'carga-de-formatos',
                loadChildren: () => import('./pages/format-upload/format-upload.module').then((m) => m.FormatUploadModule),
            },
            { path: '**', redirectTo: 'usuarios' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConfigurationsRoutingModule { }
