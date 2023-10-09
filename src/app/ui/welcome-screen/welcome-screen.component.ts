import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SettingsWelcomeService, UsersService } from 'src/app/core/services';
import { SettingsWelcomeDTO } from 'src/app/utils/models';

@Component({
    selector: 'app-welcome-screen',
    templateUrl: './welcome-screen.component.html',
    styleUrls: ['./welcome-screen.component.scss'],
})
export class WelcomeScreenComponent implements OnInit {
    data: SettingsWelcomeDTO;
    dataSource: MatTableDataSource<SettingsWelcomeDTO>;
    selection: SelectionModel<SettingsWelcomeDTO>;
    disabled: boolean;
    permission: boolean;
    subscription: Subscription;
    html: any = null;
    
    constructor(
        private readonly config: SettingsWelcomeService,
    ) { }

    ngOnInit(): void {
        this.config.getConfigPantallaBienvenida().subscribe((response) => {
            if (!response.output) {
                return;
            }
            const data = new SettingsWelcomeDTO().deserialize(response.output[0]);
            this.data = data;
            this.html = this.data.htmlBienvenida ? this.data.htmlBienvenida : '\<h2 style=\"text-align: center;\"\>Configure la pantalla de bienvenida\</h2\>';
        });
    }
}
