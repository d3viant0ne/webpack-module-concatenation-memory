﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Status9Mod4GridComponent } from './components/status9-mod4-grid/status9-mod4-grid.component';
import { Status9Mod4 } from './../../models/status9-mod4';

import { Status9Mod4Service } from './../../services/status9-mod4.service';

@Component({
  selector: 'app-mod4-status9-mod4-page',
  templateUrl: './status9-mod4-page.component.html',
  providers: [
    Status9Mod4Service
  ]
})
export class Status9Mod4PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Status9Mod4;

  @ViewChild('grid') grid: Status9Mod4GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private status9Mod4Service: Status9Mod4Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod4.status9Mod4.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Status9Mod4;
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
    this.router.navigate(['/mod4/status9-mod4', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.status9Mod4Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
