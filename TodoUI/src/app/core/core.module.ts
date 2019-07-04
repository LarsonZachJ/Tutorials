import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService, ToastService } from '@app/core';

@NgModule({
  exports: [],
  providers: [],
  imports: [CommonModule],
  declarations: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [TodoService, ToastService]
    };
  }
}
