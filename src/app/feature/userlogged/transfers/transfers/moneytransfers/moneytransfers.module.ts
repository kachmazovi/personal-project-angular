import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneytransfersComponent } from './moneytransfers/moneytransfers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MoneytransfersComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MoneytransfersComponent,
      },
    ]),
  ],
})
export class MoneytransfersModule {}
