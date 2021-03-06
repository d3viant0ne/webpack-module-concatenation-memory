﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Status2Mod1GridComponent } from './components/status2-mod1-grid/status2-mod1-grid.component';
import { Status2Mod1 } from './../../models/status2-mod1';

import { Status2Mod1Service } from './../../services/status2-mod1.service';

@Component({
  selector: 'app-mod1-status2-mod1-page',
  templateUrl: './status2-mod1-page.component.html',
  providers: [
    Status2Mod1Service
  ]
})
export class Status2Mod1PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Status2Mod1;

  @ViewChild('grid') grid: Status2Mod1GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private status2Mod1Service: Status2Mod1Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod1.status2Mod1.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Status2Mod1;
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
    this.router.navigate(['/mod1/status2-mod1', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.status2Mod1Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
