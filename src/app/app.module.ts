import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdMenuModule,
  MdToolbarModule,
  MdSelectModule,
  MdDialogModule,
  MdTabsModule,
  MdTooltipModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DndModule, DragDropService, DragDropConfig} from 'ng2-dnd';
import { LoginComponent } from './login/login.component';
import { DataService } from './data.service';
import { ProfessorComponent } from './professor/professor.component';
import { StarRatingModule } from 'angular-star-rating';
import { TadetailsComponent } from './tadetails/tadetails.component';
import {SharedService} from "./shared.service";

export const ROUTES: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'prof', component: ProfessorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfessorComponent,
    TadetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    MdButtonModule,
    MdToolbarModule,
    MdCardModule,
    MdIconModule,
    MdTabsModule,
    MdTooltipModule,
    FormsModule,
    FlexLayoutModule,
    DndModule.forRoot(),
    MdMenuModule,
    MdSelectModule,
    MdDialogModule,
    StarRatingModule.forRoot()
  ],
  providers: [DragDropService, DragDropConfig, DataService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
