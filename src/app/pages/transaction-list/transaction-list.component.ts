/*
 * Polkascan PRE Explorer GUI
 *
 * Copyright 2018-2019 openAware BV (NL).
 * This file is part of Polkascan.
 *
 * Polkascan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Polkascan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Polkascan. If not, see <http://www.gnu.org/licenses/>.
 *
 * extrinsic-list.component.ts
 *
 */

import { Component, OnInit } from '@angular/core';
import {DocumentCollection, Service} from 'ngx-jsonapi';
import {ExtrinsicService} from '../../services/extrinsic.service';
import {Extrinsic} from '../../classes/extrinsic.class';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  public extrinsics: DocumentCollection<Extrinsic>;
  currentPage = 1;

  constructor(
    private extrinsicService: ExtrinsicService
  ) {

  }

  ngOnInit() {
    this.getExtrinsics(this.currentPage);
  }

  getExtrinsics(page: number): void {

    const params = {
      page: { number: page, size: 25},
      remotefilter: { signed: 1},
    };

    this.extrinsicService.all(params).subscribe(extrinsics => {
      this.extrinsics = extrinsics;
    });
  }

  refreshExtrinsics(): void {
    this.getExtrinsics(this.currentPage);
  }

  getNextExtrinsics(): void {
    this.currentPage += 1;
    this.refreshExtrinsics();
  }
}
