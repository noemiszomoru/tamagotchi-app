import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsListEditComponent } from './groups-list-edit/groups-list-edit.component';
import { ChildrenListComponent } from './children-list/children-list.component';
import { FoodSleepListComponent } from './food-sleep-list/food-sleep-list.component';
import { ChildrenListEditComponent } from './children-list-edit/children-list-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/groups', pathMatch: 'full' },
  {
    path: 'groups', component: GroupsListComponent, children: [
      // { path: ':id', component: GroupItemComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'groups/new', component: GroupsListEditComponent, children: [
      // { path: ':id', component: GroupItemComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'children', component: ChildrenListComponent, children: [
      { path: ':groupId', component: ChildrenListComponent },
      // { path: 'new', component: ChildrenListEditComponent }
    ]
  },
  {
    path: 'children/new', component: ChildrenListEditComponent, children: [
      // { path: ':id', component: GroupItemComponent }
    ]
  },
  { path: 'food-sleep', component: FoodSleepListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
