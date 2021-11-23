import { NgModule } from "@angular/core";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { LogoutComponent } from './logout/logout.component';
@NgModule({
    declarations: [LogoutComponent],
    exports: [LogoutComponent],
    imports: [ScrollingModule, CdkScrollableModule]
})
export class comComponentsModule { }