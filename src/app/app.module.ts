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
import { StudentComponent } from './student/student.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import {SharedService} from "./shared.service";
import { CourseComponent } from './course/course.component';
import { MessageComponent } from './message/message.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'prof', component: ProfessorComponent},
  {path: 'student', component: StudentComponent},
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
    CourseComponent,
    MessageComponent
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
    FlexLayoutModule,
    DndModule.forRoot(),
    MdMenuModule,
    MdSelectModule,
    MdDialogModule,
    MdSidenavModule,
    StarRatingModule.forRoot()
  ],
  providers: [DragDropService, DragDropConfig, DataService, SharedService, MdDialogModule, MdDialog, MdSidenavModule, PdfViewerComponent],
  bootstrap: [AppComponent],
  entryComponents: [TadetailsComponent] // Added for TA Info Dialog Box Issue #15
})
export class AppModule {
}
