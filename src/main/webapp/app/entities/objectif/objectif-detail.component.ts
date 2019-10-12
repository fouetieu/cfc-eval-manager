import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IObjectif } from 'app/shared/model/objectif.model';

@Component({
  selector: 'jhi-objectif-detail',
  templateUrl: './objectif-detail.component.html'
})
export class ObjectifDetailComponent implements OnInit {
  objectif: IObjectif;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ objectif }) => {
      this.objectif = objectif;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
