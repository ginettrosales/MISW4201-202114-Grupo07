import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { AppMenuModule } from '../app-header/app-menu.module';
import { AppHeaderModule } from '../app-header/app-header.module';

@NgModule({
  imports: [
    CommonModule,AppMenuModule,AppHeaderModule
  ],
  declarations: [AcercaDeComponent],
  exports: [AcercaDeComponent]
})
export class InicioModule { }
