import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecuerdosPage } from './recuerdos';

@NgModule({
  declarations: [
    RecuerdosPage,
  ],
  imports: [
    IonicPageModule.forChild(RecuerdosPage),
  ],
})
export class RecuerdosPageModule {}
