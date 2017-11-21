﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Category5Mod5GridComponent } from './components/category5-mod5-grid/category5-mod5-grid.component';
import { Category5Mod5 } from './../../models/category5-mod5';

import { Category5Mod5Service } from './../../services/category5-mod5.service';

@Component({
  selector: 'app-mod5-category5-mod5-page',
  templateUrl: './category5-mod5-page.component.html',
  providers: [
    Category5Mod5Service
  ]
})
export class Category5Mod5PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Category5Mod5;

  @ViewChild('grid') grid: Category5Mod5GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private category5Mod5Service: Category5Mod5Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod5.category5Mod5.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Category5Mod5;
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
    this.router.navigate(['/mod5/category5-mod5', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.category5Mod5Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
