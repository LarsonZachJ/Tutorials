import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditTodoComponent } from './edit-todo.component';

@NgModule({
  declarations: [AppComponent, EditTodoComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  entryComponents: [EditTodoComponent]
})
export class AppModule {}
