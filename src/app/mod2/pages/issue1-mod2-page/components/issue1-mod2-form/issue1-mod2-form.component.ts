﻿import { Component, ViewChild, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { CustomValidators } from 'ng2-validation';
import { AuthService } from './../../../../../shared/services/auth.service';
import { HelperService } from './../../../../../shared/services/helper.service';
import { SettingsService } from './../../../../../shared/services/settings.service';
import { FormComponent } from './../../../../../shared/components/form/form.component';

import { Project1Mod2Service } from './../../../../services/project1-mod2.service';
import { Category1Mod2Service } from './../../../../services/category1-mod2.service';
import { Status1Mod2Service } from './../../../../services/status1-mod2.service';
import { Severity1Mod2Service } from './../../../../services/severity1-mod2.service';
import { Issue1Mod2Service } from './../../../../services/issue1-mod2.service';
import { Issue1Mod2 } from './../../../../models/issue1-mod2';

@Component({
  selector: 'app-mod2-issue1-mod2-form',
  templateUrl: './issue1-mod2-form.component.html'
})
export class Issue1Mod2FormComponent extends FormComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public formGroup: FormGroup;

  @Input() newRecord: boolean;
  @Input() item: Issue1Mod2;

  @Output() gridRefreshEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    authService: AuthService,
    settingsService: SettingsService,
    private helperService: HelperService,
    private project1Mod2Service: Project1Mod2Service,
    private category1Mod2Service: Category1Mod2Service,
    private status1Mod2Service: Status1Mod2Service,
    private severity1Mod2Service: Severity1Mod2Service,
    private issue1Mod2Service: Issue1Mod2Service) {
    super(authService, settingsService);
  }

  ngOnInit() {
    this.loadSelects();
    this.buildFormGroup();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private buildFormGroup(): void {
    this.formGroup = this.fb.group({
      issueId: [this.item.issueId, []],
      projectId: [super.toString(this.item.projectId), [Validators.required]],
      title: [this.item.title, [Validators.required]],
      categoryId: [super.toString(this.item.categoryId), [Validators.required]],
      statusId: [super.toString(this.item.statusId), [Validators.required]],
      severityId: [super.toString(this.item.severityId), [Validators.required]],
      description: [this.item.description, [Validators.required]]
    });
  }

  public back(): void {
    this.router.navigate(['/mod2/issue1-mod2']);
  }

  public save(): void {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.isLoading = true;
      const item = this.formGroup.value;
      this.issue1Mod2Service
        .save(this.newRecord, item)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(result => {
          if (result.isValid) {
            this.helperService.message.success(result);
            this.gridRefreshEventEmitter.emit(null);
            setTimeout(() => { this.back(); }, 0);
          } else {
            this.helperService.message.error(result);
          }
          this.isLoading = false;
        });
    }
  }

  private loadSelects(): void {
    this.project1Mod2Service
      .getSelectList()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(items => {
        this.selects.itemsProject1Mod2 = items;
      });

    this.category1Mod2Service
      .getSelectList()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(items => {
        this.selects.itemsCategory1Mod2 = items;
      });

    this.status1Mod2Service
      .getSelectList()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(items => {
        this.selects.itemsStatus1Mod2 = items;
      });

    this.severity1Mod2Service
      .getSelectList()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(items => {
        this.selects.itemsSeverity1Mod2 = items;
      });
  }

}
