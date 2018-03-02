import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerMainPage } from './worker-main';

@NgModule({
  declarations: [
    WorkerMainPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerMainPage),
  ],
})
export class WorkerMainPageModule {}
