import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChildrenListComponent } from './children-list/children-list.component';
import { ChildrenListEditComponent } from './children-list-edit/children-list-edit.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsEditComponent } from './groups-list/groups-edit/groups-edit.component';
import { FoodSleepListComponent } from './food-sleep-list/food-sleep-list.component';
import { DataStorageService } from './shared/data.storage.service';
import { FoodSleepItemComponent } from './food-sleep-item/food-sleep-item.component';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { TimepickerComponent } from './food-sleep-item/timepicker/timepicker.component';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { TokenComponent } from './token/token.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChildrenListComponent,
    ChildrenListEditComponent,
    GroupsListComponent,
    GroupsEditComponent,
    FoodSleepListComponent,
    FoodSleepItemComponent,
    UsersComponent,
    UsersEditComponent,
    TimepickerComponent,
    LoginComponent,
    RegisterComponent,
    SetPasswordComponent,
    TokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    AuthModule,
  ],
  providers: [DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
