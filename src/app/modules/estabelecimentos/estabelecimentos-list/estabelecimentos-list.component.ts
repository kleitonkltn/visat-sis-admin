import { Component, OnInit, ViewChild } from '@angular/core';
import { EstabelecimentosService } from 'src/app/services/Estabelecimentos.service';
import { Estabelecimentos } from 'src/models/Estabelecimentos';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConsultaCNPJService } from 'src/app/services/ConsultaCNPJ.service';


@Component({
  selector: 'app-estabelecimentos-list',
  templateUrl: './estabelecimentos-list.component.html',
  styleUrls: ['./estabelecimentos-list.component.sass']
})
export class EstabelecimentosListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  items = []
  estabelecimentos: Estabelecimentos[] = [];
  loadingList = false;
  displayedColumns: string[] = ['id', 'razao_social', 'nome_fantasia', 'cnpj_cpf', 'options'];
  dataSource: any;


  constructor(private estabalecimentoService: EstabelecimentosService) { }


  ngOnInit() {
    this.getEstabelecimentos().then(() => {
      this.dataSource = new MatTableDataSource<Estabelecimentos>(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  initializeItems() {
    this.items = this.estabelecimentos;
  }
  getEstabelecimentos() {
    return new Promise((resolve, _reject) => {
      this.estabalecimentoService.getAll().subscribe((items: Estabelecimentos[]) => {
        this.estabelecimentos = items;
        this.initializeItems()
        resolve(items)
      })
    })
  }
}


