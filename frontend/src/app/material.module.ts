import { NgModule } from '@angular/core';


import { ReactiveFormsModule } from '@angular/forms';

//need to add every module, that you wanna use as a tag
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatRadioModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
  ReactiveFormsModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}


