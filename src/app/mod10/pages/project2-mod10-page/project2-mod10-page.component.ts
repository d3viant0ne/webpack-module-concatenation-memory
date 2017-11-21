﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Project2Mod10GridComponent } from './components/project2-mod10-grid/project2-mod10-grid.component';
import { Project2Mod10 } from './../../models/project2-mod10';

import { Project2Mod10Service } from './../../services/project2-mod10.service';

@Component({
  selector: 'app-mod10-project2-mod10-page',
  templateUrl: './project2-mod10-page.component.html',
  providers: [
    Project2Mod10Service
  ]
})
export class Project2Mod10PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Project2Mod10;

  @ViewChild('grid') grid: Project2Mod10GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private project2Mod10Service: Project2Mod10Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod10.project2Mod10.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Project2Mod10;
        } else {
          this.item = null;
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public new(): void {
    this.newRecord = true;
    this.router.navigate(['/mod10/project2-mod10', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.project2Mod10Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
