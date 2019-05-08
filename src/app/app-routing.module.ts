import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsEditComponent } from './groups-list/groups-edit/groups-edit.component';
import { ChildrenListComponent } from './children-list/children-list.component';
import { FoodSleepListComponent } from './food-sleep-list/food-sleep-list.component';
import { ChildrenListEditComponent } from './children-list-edit/children-list-edit.component';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'group/:id', component: GroupsEditComponent, canActivate: [AuthGuard], children: [
      // { path: ':id', component: GroupItemComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'groups/new', component: GroupsEditComponent, canActivate: [AuthGuard], children: [
      // { path: ':id', component: GroupItemComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'groups', component: GroupsListComponent, canActivate: [AuthGuard], children: [
      // { path: ':id', component: GroupsEditComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'child/:id', component: ChildrenListEditComponent, canActivate: [AuthGuard], children: [
      // { path: ':id', component: GroupItemComponent }
    ]
  },
  {
    path: 'children/new', component: ChildrenListEditComponent, canActivate: [AuthGuard], children: [
      // { path: ':id', component: GroupItemComponent }
    ]
  },
  {
    path: 'children', component: ChildrenListComponent, canActivate: [AuthGuard], children: [
      // { path: 'new', component: ChildrenListEditComponent },
      { path: ':groupId', component: ChildrenListComponent }

    ]
  },
  {
    path: 'users', component: UsersComponent, canActivate: [AuthGuard], children: [
      // { path: 'new', component: ChildrenListEditComponent },

    ]
  },
  {
    path: 'users/new', component: UsersEditComponent, canActivate: [AuthGuard], children: [
      // { path: 'new', component: ChildrenListEditComponent },

    ]
  },
  {
    path: 'food-sleep', component: FoodSleepListComponent, canActivate: [AuthGuard], children: [
      { path: ':date', component: FoodSleepListComponent }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
