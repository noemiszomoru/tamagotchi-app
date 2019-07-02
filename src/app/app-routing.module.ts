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
import { SetPasswordComponent } from './set-password/set-password.component';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { TokenComponent } from './token/token.component';
import { ParentViewComponent } from './parent-view/parent-view.component';
import { RoleGuard } from './auth/guards/role.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'group/:id', component: GroupsEditComponent, canActivate: [RoleGuard], data: { expectedRole: 'teacher' }, children: [
      // { path: ':id', component: GroupItemComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'groups/new', component: GroupsEditComponent, canActivate: [RoleGuard], data: { expectedRole: 'teacher' }, children: [
      // { path: ':id', component: GroupItemComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'groups', component: GroupsListComponent, canActivate: [RoleGuard], data: { expectedRole: 'teacher' }, children: [
      // { path: ':id', component: GroupsEditComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },
  {
    path: 'child/:id', component: ChildrenListEditComponent, canActivate: [RoleGuard], data: { expectedRole: 'teacher' }, children: [
      // { path: ':id', component: GroupItemComponent }
    ]
  },
  {
    path: 'children/new', component: ChildrenListEditComponent, canActivate: [RoleGuard], data: { expectedRole: 'teacher' }, children: [
      // { path: ':id', component: GroupItemComponent }
    ]
  },
  {
    path: 'children', component: ChildrenListComponent, canActivate: [RoleGuard], data: { expectedRole: 'teacher' }, children: [
      // { path: 'new', component: ChildrenListEditComponent },
      { path: ':groupId', component: ChildrenListComponent }

    ]
  },
  {
    path: 'users', component: UsersComponent, canActivate: [RoleGuard], data: { expectedRole: 'teacher' }, children: [
      // { path: 'new', component: ChildrenListEditComponent },

    ]
  },
  {
    path: 'user/:id', component: UsersEditComponent, canActivate: [RoleGuard], data: { expectedRole: 'teacher' }, children: [
      // { path: ':id', component: GroupItemComponent }
    ]
  },
  {
    path: 'users/new', component: UsersEditComponent, canActivate: [RoleGuard], data: { expectedRole: 'teacher' }, children: [
      // { path: 'new', component: ChildrenListEditComponent },

    ]
  },
  {
    path: 'food-sleep', component: FoodSleepListComponent, canActivate: [RoleGuard], data: { expectedRole: 'teacher' }, children: [
      { path: ':date/:group', component: FoodSleepListComponent },
      { path: ':date', component: FoodSleepListComponent }

    ]
  },
  {
    path: 'token/:token', component: TokenComponent,
  },
  {
    path: 'set-password', component: SetPasswordComponent,
  },
  {
    path: 'parent', component: ParentViewComponent, canActivate: [RoleGuard], data: { expectedRole: 'parent' }, children: [
      // { path: ':id', component: GroupItemComponent }
      // { path: 'new', component: GroupsListEditComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
