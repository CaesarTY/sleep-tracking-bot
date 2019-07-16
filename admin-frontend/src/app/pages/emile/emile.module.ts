import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSmartTableDatepickerComponent } from '../reusable-views/ngx-smart-table-datepicker/ngx-smart-table-datepicker.component';

import { EmileComponent } from './emile.component';
import { EmileUserTableComponent } from './emile-user-table/emile-user-table.component';
import { EmileRecordTableComponent } from './emile-record-table/emile-record-table.component';
import { EmilePlanTableComponent } from './emile-plan-table/emile-plan-table.component';

@NgModule({
  imports: [
    Ng2SmartTableModule,
  ],
  declarations: [
    EmileComponent,
    EmileUserTableComponent,
    EmileRecordTableComponent,
    EmilePlanTableComponent,
  ],
  providers: [
  ],
  entryComponents: [
    NgxSmartTableDatepickerComponent,
  ],
})
export class EmileModule { }
