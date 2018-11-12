import {NgModule} from '@angular/core';
import { administrationRoutes } from './administration.route';
import {CommonModule} from '@angular/common';
import {MatIconModule, MatDividerModule, MatListModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

import {AdminPageHeaderComponent} from './admin-page-header/admin-page-header.component';

import {SystemComponent} from './system/system.component';
import {PluginsComponent} from './plugins/plugins.component';
import {DevicesComponent} from './devices/devices.component';
import {AutomationComponent} from './automation/automation.component';
import {RecipientsComponent} from './recipients/recipients.component';
import {UpdateComponent} from './update/update.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {AboutComponent} from './about/about.component';

@NgModule({
  imports: [ CommonModule, administrationRoutes, MatListModule, MatIconModule, HttpClientModule, MatDividerModule ],
  declarations: [AdminPageHeaderComponent, SystemComponent, PluginsComponent, DevicesComponent,
    AutomationComponent, RecipientsComponent, UpdateComponent, MaintenanceComponent, AboutComponent]
})
export class AdministrationModule {
}