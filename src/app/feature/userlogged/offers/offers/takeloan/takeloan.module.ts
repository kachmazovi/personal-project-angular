import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TakeloanComponent } from './takeloan/takeloan.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TakeloanComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TakeloanComponent,
      },
    ]),
  ],
})
export class TakeloanModule {}
