import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { CfcEvalManagerSharedModule } from 'app/shared/shared.module';
import { CfcEvalManagerCoreModule } from 'app/core/core.module';
import { CfcEvalManagerAppRoutingModule } from './app-routing.module';
import { CfcEvalManagerHomeModule } from './home/home.module';
import { CfcEvalManagerEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    CfcEvalManagerSharedModule,
    CfcEvalManagerCoreModule,
    CfcEvalManagerHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CfcEvalManagerEntityModule,
    CfcEvalManagerAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class CfcEvalManagerAppModule {}
