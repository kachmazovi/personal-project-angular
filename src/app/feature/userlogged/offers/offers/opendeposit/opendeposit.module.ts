import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpendepositComponent } from './opendeposit/opendeposit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OpendepositComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OpendepositComponent,
      },
    ]),
  ],
})
export class OpendepositModule {}
