import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';

import { throwIfAlreadyLoaded } from '../utils/helpers';
import { GlobalErrorHandler } from './handlers/global-error/global-error.handler';
import { HttpErrorInterceptor, HttpJwtInterceptor } from './interceptors';
import { ProgressModule } from './modules/progress';
import {
    AccessTypeService,
    AccreditorsService,
    CampusService,
    ChapterService,
    ComponentsService,
    CorporateAreaService,
    CriteriaService,
    CyclesService,
    CyclesServiceV1,
    EvaluationElementService,
    EvaluationPeriodService,
    EvidenceIndexService,
    EvidenceLogService,
    EvidencesService,
    EvidenceTypeService,
    FileUploadService,
    FollowupService,
    GeneralConfigurationService,
    IndicatorService,
    InstitutionService,
    LevelAttentionService,
    LevelModalityService,
    NormativeService,
    ProfileService,
    RegionsService,
    ReportsService,
    ResponsibilityAreasService,
    RoleAssignmentService,
    RolesService,
    SchoolCareerService,
    SitesService,
    SubtaskService,
    UsersService,
    ViewsService,
    WeightService,
    EvidencesCatalogService,
    SettingsWelcomeService,

} from './services';

const SERVICES = [
    SchoolCareerService,
    AccessTypeService,
    UsersService,
    CampusService,
    FollowupService,
    LevelAttentionService,
    RegionsService,
    SitesService,
    SubtaskService,
    EvidenceTypeService,
    AccreditorsService,
    ResponsibilityAreasService,
    EvidenceIndexService,
    EvidenceLogService,
    RolesService,
    CriteriaService,
    ChapterService,
    FileUploadService,
    EvidencesService,
    RoleAssignmentService,
    ViewsService,
    CyclesService,
    CyclesServiceV1,
    ReportsService,
    LevelModalityService,
    ComponentsService,
    NormativeService,
    IndicatorService,
    InstitutionService,
    EvaluationElementService,
    EvaluationPeriodService,
    CorporateAreaService,
    GeneralConfigurationService,
    WeightService,
    ProfileService,
    EvidencesCatalogService,
    SettingsWelcomeService,
];

@NgModule({
    imports: [ProgressModule.forRoot(), HttpClientModule],
    exports: [ProgressModule],
    providers: [
        SERVICES,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: HttpJwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
