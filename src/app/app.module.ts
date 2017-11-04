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
  MdDialog,
  MdTabsModule,
  MdSidenavModule,
  MdTooltipModule,
  MdListModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DndModule, DragDropService, DragDropConfig} from 'ng2-dnd';
import { LoginComponent } from './login/login.component';
import { DataService } from './data.service';
import { ProfessorComponent } from './professor/professor.component';
import { StarRatingModule } from 'angular-star-rating';
import { TadetailsComponent } from './tadetails/tadetails.component';
import { StudentComponent } from './student/student.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import {SharedService} from "./shared.service";
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { CommonModule } from '@angular/common';
import { StudenthomeComponent } from './studenthome/studenthome.component';
import { GpaChangeComponent } from './studentprofile/studentprofile.component';
import { CourseComponent } from './course/course.component';
import { MessageComponent } from './message/message.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { ManagerComponent } from './manager/manager.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'prof', component: ProfessorComponent},
  {path: 'student', component: StudentComponent},
  {path: 'manager', component: ManagerComponent},
  {path: 'course/:id', component: CourseComponent,
  children: [{path: 'new-message', component: MessageComponent}]},

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfessorComponent,
    TadetailsComponent,
    StudentComponent,
    PdfViewerComponent,
    StudentprofileComponent,
    StudenthomeComponent,
    GpaChangeComponent,
    CourseComponent,
    MessageComponent,
    FileSelectDirective,
    ManagerComponent
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
    MdListModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DndModule.forRoot(),
    MdMenuModule,
    MdSelectModule,
    MdDialogModule,
    MdSidenavModule,
    StarRatingModule.forRoot(),
    CommonModule
  ],
  providers: [DragDropService, DragDropConfig, DataService, SharedService, MdDialogModule, MdDialog, MdSidenavModule, PdfViewerComponent],
  bootstrap: [AppComponent],
  entryComponents: [TadetailsComponent, GpaChangeComponent] // Added for TA Info Dialog Box Issue #15
})
export class AppModule {
}
