﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../../../shared/services/auth.service';
import { HelperService } from './../../../../../shared/services/helper.service';
import { GridComponent } from './../../../../../shared/components/grid/grid.component';
import { ModalDeleteComponent } from './../../../../../shared/components/modal-delete/modal-delete.component';

import { Status10Mod1Service } from './../../../../services/status10-mod1.service';

@Component({
  selector: 'app-mod1-status10-mod1-grid',
  templateUrl: './status10-mod1-grid.component.html'
})
export class Status10Mod1GridComponent extends GridComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @ViewChild('modalDelete') modalDelete: ModalDeleteComponent;

  constructor(
    private router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private status10Mod1Service: Status10Mod1Service) {
    super(authService);
  }

  ngOnInit() {
    this.modalDelete.init((id) => this.delete(id));
    super.init('description', true, 10, () => this.get());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public edit(id: number) {
    this.router.navigate(['/mod1/status10-mod1', { id }]);
  }

  confirmDelete(id: number): void {
    this.modalDelete.open(id);
  }

  private get(): void {
    this.isLoading = true;
    this.status10Mod1Service
      .page(this.getParameters())
      .takeUntil(this.ngUnsubscribe)
      .subscribe(gridData => {
        this.items = gridData.data;
        this.pagination = gridData.pagination;
        this.isLoading = false;
      });
  }

  private delete(id: number): void {
    this.isLoading = true;
    this.status10Mod1Service
      .delete(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        if (result.isValid) {
          this.get();
          this.helperService.message.success(result);
        } else {
          this.helperService.message.error(result);
        }
        this.modalDelete.close();
        this.isLoading = false;
      });
  }

}
