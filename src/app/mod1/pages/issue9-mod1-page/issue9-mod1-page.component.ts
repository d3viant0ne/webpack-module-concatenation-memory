﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { ModalFilterComponent } from './../../../shared/components/modal-filter/modal-filter.component';
import { Issue9Mod1GridComponent } from './components/issue9-mod1-grid/issue9-mod1-grid.component';
import { Issue9Mod1 } from './../../models/issue9-mod1';

import { Project9Mod1Service } from './../../services/project9-mod1.service';
import { Category9Mod1Service } from './../../services/category9-mod1.service';
import { Status9Mod1Service } from './../../services/status9-mod1.service';
import { Severity9Mod1Service } from './../../services/severity9-mod1.service';
import { Issue9Mod1Service } from './../../services/issue9-mod1.service';

@Component({
  selector: 'app-mod1-issue9-mod1-page',
  templateUrl: './issue9-mod1-page.component.html',
  providers: [
    Project9Mod1Service,
    Category9Mod1Service,
    Status9Mod1Service,
    Severity9Mod1Service,
    Issue9Mod1Service
  ]
})
export class Issue9Mod1PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Issue9Mod1;

  @ViewChild('grid') grid: Issue9Mod1GridComponent;
  @ViewChild('modalFilter') modalFilter: ModalFilterComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private project9Mod1Service: Project9Mod1Service,
    private category9Mod1Service: Category9Mod1Service,
    private status9Mod1Service: Status9Mod1Service,
    private severity9Mod1Service: Severity9Mod1Service,
    private issue9Mod1Service: Issue9Mod1Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod1.issue9Mod1.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Issue9Mod1;
        } else {
          this.item = null;
        }
      });

    this.modalFilter.init(() => this.filter());
    this.loadSelects();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public filter(): void {
    this.grid.newSearch();
    this.modalFilter.close();
  }

  public new(): void {
    this.newRecord = true;
    this.router.navigate(['/mod1/issue9-mod1', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.issue9Mod1Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

  private loadSelects(): void {
    this.project9Mod1Service
      .getSelectList()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(items => {
        this.grid.selects.itemsProject9Mod1 = items;
      });

    this.category9Mod1Service
      .getSelectList()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(items => {
        this.grid.selects.itemsCategory9Mod1 = items;
      });

    this.status9Mod1Service
      .getSelectList()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(items => {
        this.grid.selects.itemsStatus9Mod1 = items;
      });

    this.severity9Mod1Service
      .getSelectList()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(items => {
        this.grid.selects.itemsSeverity9Mod1 = items;
      });
  }

}
