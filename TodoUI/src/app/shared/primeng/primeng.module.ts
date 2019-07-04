import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MessageService,
  ButtonModule,
  InputTextModule,
  DropdownModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    ButtonModule,
    ToastModule,
    TableModule,
    InputTextModule,
    DropdownModule
  ],
  providers: [MessageService]
})
export class PrimeNgModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PrimeNgModule,
      providers: [MessageService]
    };
  }
}
