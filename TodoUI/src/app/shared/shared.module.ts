import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng/primeng.module';

@NgModule({
    imports: [CommonModule, PrimeNgModule.forRoot()],
    exports: [PrimeNgModule],
    declarations: [],
    providers: []
})
export class SharedModule { }