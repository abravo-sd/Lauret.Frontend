import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogsComponent } from './catalogs.component';
import { IndicatorsUvmComponent, SubIndicatorsUvmComponent } from './pages/uvm-matrix/pages';
import { ComponentsUvmComponent } from './pages/uvm-matrix/pages/components-uvm/components-uvm.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogsComponent,
    //TODO: VALIDAR ROLES
    //canActivate: [RolesGuard],
    children: [
      {
        path: 'regiones',
        loadChildren: () => import('src/app/ui/catalogs/pages/regions/regions.module').then((m) => m.RegionsModule),
      },
      {
        path: 'instituciones',
        loadChildren: () =>
          import('src/app/ui/catalogs/pages/institutions/institutions.module').then((m) => m.InstitutionsModule),
        // loadChildren: () => import('src/app/ui/catalogs/pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'perfiles',
        loadChildren: () => import('./pages/profiles/profiles.module').then((m) => m.ProfilesModule),
      },
      {
        path: 'nivel-modalidad',
        loadChildren: () => import('./pages/level-modality/level-modality.module').then((m) => m.LevelModalityModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('src/app/ui/catalogs/pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'periodo-evaluacion',
        loadChildren: () =>
          import('./pages/evaluation-period/evaluation-period.module').then((m) => m.EvaluationPeriodModule),
      },
      {
        path: 'campus',
        loadChildren: () => import('src/app/ui/catalogs/pages/campus/campus.module').then((m) => m.CampusModule),
      },
      {
        path: 'areas-responsabilidad',
        loadChildren: () =>
          import('src/app/ui/catalogs/pages/responsibility-areas/responsibility-areas.module').then(
            (m) => m.ResponsibilityAreasModule
          ),
      },
      {
        path: 'areas-corporativas',
        loadChildren: () =>
          import('./pages/corporate-areas/corporate-areas.module').then((m) => m.CorporateAreasModule),
      },
      {
        path: 'componentes',
        loadChildren: () => import('./pages/components/components.module').then((m) => m.ComponentsModule),
      },
      {
        path: 'ponderaciones',
        loadChildren: () => import('./pages/weights/weights.module').then((m) => m.WeightsModule),
      },
      {
        path: 'matriz-uvm/asociar',
        loadChildren: () => import('./pages/uvm-matrix/uvm-matrix.module').then((m) => m.UvmMatrixModule),
      },
      { path: 'matriz-uvm/componentes-uvm', component: ComponentsUvmComponent },
      { path: 'matriz-uvm/indicador-uvm', component: IndicatorsUvmComponent },
      { path: 'matriz-uvm/subindicador-uvm', component: SubIndicatorsUvmComponent },
      {
        path: 'normativas',
        loadChildren: () => import('./pages/normative/normative.module').then((m) => m.NormativeModule),
      },
      {
        path: 'sedes',
        loadChildren: () => import('./pages/sites/sites.module').then((m) => m.SitesModule),
      },
      {
        path: 'acreditadores',
        loadChildren: () => import('./pages/accreditors/accreditors.module').then((m) => m.AccreditorsModule),
      },
      {
        path: 'criterios',
        loadChildren: () => import('./pages/criteria/criteria.module').then((m) => m.CriteriaModule),
      },
      {
        path: 'capitulos',
        loadChildren: () => import('./pages/chapters/chapters.module').then((m) => m.ChaptersModule),
      },
      {
        path: 'catalogo-elemento-evaluacion',
        loadChildren: () =>
          import('./pages/evaluation-element/evaluation-element.module').then((m) => m.EvaluationElementModule),
      },
      {
        path: 'indicadores-siac',
        loadChildren: () =>
          import('./pages/indicators-siac/indicators-siac.module').then((m) => m.IndicatorsSiacModule),
      },
      {
        path: 'dependencia-area',
        loadChildren: () =>
          import('src/app/ui/catalogs/pages/dependency-area/dependency-area.module').then(
            (m) => m.DependencyAreaModule
          ),
      },
      {
        path: 'subareas-corporativas',
        loadChildren: () =>
          import('./pages/corporate-subareas/corporate-subareas.module').then((m) => m.CorporateSubAreasModule),
      },
      {
        path: 'evidencias',
        loadChildren: () => import('./pages/evidence/evidences.module').then((m) => m.EvidencesModule),
      },
      { path: '**', redirectTo: 'acreditadores' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogsRoutingModule {}
