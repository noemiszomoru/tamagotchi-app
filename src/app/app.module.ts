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
import { GroupsEditComponent } from './groups-edit/groups-edit.component';
import { FoodSleepListComponent } from './food-sleep-list/food-sleep-list.component';
import { FoodSleepListEditComponent } from './food-sleep-list-edit/food-sleep-list-edit.component';
import { DataStorageService } from './shared/data.storage.service';
import { FoodSleepItemComponent } from './food-sleep-item/food-sleep-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChildrenListComponent,
    ChildrenListEditComponent,
    GroupsListComponent,
    GroupsEditComponent,
    FoodSleepListComponent,
    FoodSleepListEditComponent,
    FoodSleepItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
