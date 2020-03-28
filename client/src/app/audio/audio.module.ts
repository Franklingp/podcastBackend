import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioRoutingModule } from './audio-routing.module';
import { UploadComponent } from './upload/upload.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [UploadComponent, ListComponent],
  imports: [
    CommonModule,
    AudioRoutingModule
  ]
})
export class AudioModule { }
