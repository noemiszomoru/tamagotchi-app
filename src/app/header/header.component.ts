import { Component, OnInit, Input } from '@angular/core';
import { DataStorageService } from '../shared/data.storage.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  onGetData() {
    this.dataStorageService.getGroups();
  }

}
