import { NgModule } from "@angular/core";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { LogoutComponent } from './logout/logout.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
    declarations: [LogoutComponent],
    exports: [LogoutComponent,ScrollingModule, CdkScrollableModule,LeafletModule],
    imports: [ScrollingModule, CdkScrollableModule,LeafletModule],
    providers:[Network]
})
export class comComponentsModule { }