import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewUserFormPage } from './new-user-form';

@NgModule({
  declarations: [
    NewUserFormPage,
  ],
  imports: [
    IonicPageModule.forChild(NewUserFormPage),
  ],
})
export class NewUserFormPageModule {}
