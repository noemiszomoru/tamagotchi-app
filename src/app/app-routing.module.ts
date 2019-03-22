import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsListComponent } from './groups-list/groups-list.component';
import { ChildrenListComponent } from './children-list/children-list.component';
import { FoodSleepListComponent } from './food-sleep-list/food-sleep-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/groups', pathMatch: 'full' },
  { path: 'groups', component: GroupsListComponent, children: [
    // { path: ':id', component: GroupItemComponent }
  ]},
  { path: 'children', component: ChildrenListComponent , children: [
    { path: ':groupId', component: ChildrenListComponent }
  ]},
  { path: 'food-sleep', component: FoodSleepListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
