﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Severity7Mod10GridComponent } from './components/severity7-mod10-grid/severity7-mod10-grid.component';
import { Severity7Mod10 } from './../../models/severity7-mod10';

import { Severity7Mod10Service } from './../../services/severity7-mod10.service';

@Component({
  selector: 'app-mod10-severity7-mod10-page',
  templateUrl: './severity7-mod10-page.component.html',
  providers: [
    Severity7Mod10Service
  ]
})
export class Severity7Mod10PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Severity7Mod10;

  @ViewChild('grid') grid: Severity7Mod10GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private severity7Mod10Service: Severity7Mod10Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod10.severity7Mod10.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Severity7Mod10;
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
    this.router.navigate(['/mod10/severity7-mod10', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.severity7Mod10Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
