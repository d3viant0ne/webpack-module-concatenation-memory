﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Severity2Mod9GridComponent } from './components/severity2-mod9-grid/severity2-mod9-grid.component';
import { Severity2Mod9 } from './../../models/severity2-mod9';

import { Severity2Mod9Service } from './../../services/severity2-mod9.service';

@Component({
  selector: 'app-mod9-severity2-mod9-page',
  templateUrl: './severity2-mod9-page.component.html',
  providers: [
    Severity2Mod9Service
  ]
})
export class Severity2Mod9PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Severity2Mod9;

  @ViewChild('grid') grid: Severity2Mod9GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private severity2Mod9Service: Severity2Mod9Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod9.severity2Mod9.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Severity2Mod9;
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
    this.router.navigate(['/mod9/severity2-mod9', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.severity2Mod9Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
