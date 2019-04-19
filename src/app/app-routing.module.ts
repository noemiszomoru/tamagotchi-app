import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsEditComponent } from './groups-list/groups-edit/groups-edit.component';
import { ChildrenListComponent } from './children-list/children-list.component';
import { FoodSleepListComponent } from './food-sleep-list/food-sleep-list.component';
import { ChildrenListEditComponent } from './children-list-edit/children-list-edit.component';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/groups', pathMatch: 'full' },
  {
    path: 'groups/new', component: GroupsEditComponent, children: [
      // { path: ':id', component: GroupItemComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'groups', component: GroupsListComponent, children: [
      // { path: ':id', component: GroupItemComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'groups/new', component: GroupsEditComponent, children: [
      // { path: ':id', component: GroupItemComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'children/new', component: ChildrenListEditComponent, children: [
      // { path: ':id', component: GroupItemComponent }
    ]
  },
  {
    path: 'children', component: ChildrenListComponent, children: [
      // { path: 'new', component: ChildrenListEditComponent },
      { path: ':groupId', component: ChildrenListComponent }

    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      // { path: 'new', component: ChildrenListEditComponent },

    ]
  },
  {
    path: 'users/new', component: UsersEditComponent, children: [
      // { path: 'new', component: ChildrenListEditComponent },

    ]
  },
  {
    path: 'food-sleep', component: FoodSleepListComponent, children: [
      { path: ':date', component: FoodSleepListComponent }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
