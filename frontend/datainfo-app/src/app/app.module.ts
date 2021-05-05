import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { TaskListComponent } from './components/pages/task/task-list/task-list.component';
import { AlertErrorComponent } from './components/bootstrap/alert-error/alert-error.component';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { TaskNewModalComponent } from './components/pages/task/task-new-modal/task-new-modal.component';
import { TaskEditModalComponent } from './components/pages/task/task-edit-modal/task-edit-modal.component';
import { TaskDeleteModalComponent } from './components/pages/task/task-delete-modal/task-delete-modal.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import {AuthService} from "./services/auth.service";
import { NavbarComponent } from './components/bootstrap/navbar/navbar.component';
import {AuthGuard} from "./guards/auth.guard";
import { TaskSearchFormComponent } from './components/pages/task/task-search-form/task-search-form.component';
import { UserNewModalComponent } from './components/pages/user/user-new-modal/user-new-modal.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks/list', component: TaskListComponent, canActivate: [AuthGuard] },
  // tslint:disable-next-line:comment-format
  { path: '', redirectTo: '/login', pathMatch: 'full' }, //Define page default
];

export function jwtfactory(authService: AuthService) {
    return {
        whitelistedDomains: [
            new RegExp('localhost:8000/*'),
            new RegExp('http://192.168.99.100:8080/*'),
        ],
        tokenGetter: () => {
            return authService.getToken();
        }
    };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    AlertErrorComponent,
    ModalComponent,
    TaskNewModalComponent,
    TaskEditModalComponent,
    TaskDeleteModalComponent,
    NavbarComponent,
    TaskSearchFormComponent,
    UserNewModalComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes, {enableTracing: true}),
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtfactory,
                deps: [AuthService]
            }
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
