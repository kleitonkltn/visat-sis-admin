import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProcedimentosService } from 'src/app/services/Procedimentos.service';
import { Procedimentos } from 'src/models/Procedimentos';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-procedimentos-list',
  templateUrl: './procedimentos-list.component.html',
  styleUrls: ['./procedimentos-list.component.css']
})
export class ProcedimentosListComponent implements OnInit {
  panelOpenState = false;
  @Input() idEstabelecimento: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  items = [];
  procedimentos: Procedimentos[] = [];
  loadingList = false;
  displayedColumns: string[] = ['id', 'description', 'comments', 'accomplishedAt', 'options'];
  dataSource: any;
  idProcedimentoEdit;

  constructor(private procedimentosService: ProcedimentosService,

  ) { }

  setEdit(v: number) {
    this.idProcedimentoEdit = undefined;
    setTimeout(() => {
      this.idProcedimentoEdit = v;
      this.panelOpenState = true;
    }, 1000);
  }
  alterForm() {
    this.idProcedimentoEdit = undefined;
    this.panelOpenState = false;
    this.getProcedimentos().then(() => {
      this.initializeItems();
    });
  }
  ngOnInit(): void {
    this.getProcedimentos().then(() => {
      this.initializeItems();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  initializeItems() {
    this.items = this.procedimentos;
    this.dataSource = new MatTableDataSource<Procedimentos>(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getProcedimentos() {
    return new Promise((resolve, _reject) => {
      if (this.idEstabelecimento) {
        this.loadingList = true
        this.procedimentosService.getByEstabelecimentoId(this.idEstabelecimento).subscribe((items: Procedimentos[]) => {
          this.procedimentos = items;
          this.loadingList = false;
          resolve(items);
          (err) => {
            this.loadingList = false;
            _reject(err);
            console.log(err);
          }
        });
      }
    });

  }
}


