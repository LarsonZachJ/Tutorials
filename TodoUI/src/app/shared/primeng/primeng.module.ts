import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MessageService,
  ButtonModule,
  InputTextModule,
  DropdownModule,
  InputSwitchModule,
  DialogService,
  FieldsetModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';

@NgModule({
  exports: [
    ButtonModule,
    ToastModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    DynamicDialogModule,
    FieldsetModule
  ],
  providers: [MessageService, DialogService]
})
export class PrimeNgModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PrimeNgModule,
      providers: [MessageService, DialogService]
    };
  }
}
