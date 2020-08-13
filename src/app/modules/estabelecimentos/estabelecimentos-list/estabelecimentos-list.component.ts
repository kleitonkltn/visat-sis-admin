import { Component, OnInit, ViewChild } from '@angular/core';
import { EstabelecimentosService } from 'src/app/services/Estabelecimentos.service';
import { Estabelecimentos } from 'src/models/Estabelecimentos';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment-timezone';
import { Tools } from 'src/app/utils/tools-service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-estabelecimentos-list',
  templateUrl: './estabelecimentos-list.component.html',
  styleUrls: ['./estabelecimentos-list.component.sass']
})
export class EstabelecimentosListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('dataFinal', { static: true }) dataFinal: MatDatepicker<Date>;
  @ViewChild('dataInicial', { static: true }) dataInicial: MatDatepicker<Date>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  items = []
  estabelecimentos: Estabelecimentos[] = [];
  loadingList = false;
  displayedColumns: string[] = ['select', 'id', 'razao_social', 'nome_fantasia', 'cnpj_cpf', 'options'];
  dataSource: MatTableDataSource<Estabelecimentos>;
  selection = new SelectionModel<Estabelecimentos>(true, []);


  constructor(private estabalecimentoService: EstabelecimentosService) { }

  ngOnInit() {
    this.getEstabelecimentos().then(() => {
      this.dataSource = new MatTableDataSource<Estabelecimentos>(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.estabelecimentos.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  initializeItems() {
    this.items = this.estabelecimentos;
  }
  getEstabelecimentos() {
    this.loadingList = true
    return new Promise((resolve, _reject) => {
      this.estabalecimentoService.getAll().subscribe((items: Estabelecimentos[]) => {
        this.estabelecimentos = items;
        this.initializeItems()
        this.loadingList = false
        resolve(items)
      })
    })
  }
  getPDFReportAllEstabelecimentos() {
    this.estabalecimentoService.getPDFReportAllEstabelecimentos().subscribe((data) => {
      Tools.openPDFFile(data);
    }, (err) => {
      Tools.openErrorDoGeneratePDFFile(err)
    })
  }
  getReportEstabelecimentosByIDs() {
    const idEstabelecimentos: number[] = [];
    this.selection.selected.map((data) => {
      idEstabelecimentos.push(data.id);
    })
    this.estabalecimentoService.getReportEstabelecimentosByIDs(idEstabelecimentos)
      .subscribe((data) => {
        Tools.openPDFFile(data);
      }, (err) => {
        Tools.openErrorDoGeneratePDFFile(err)
      })
  }
  getReportEstabelecimentosByDate() {
    this.estabalecimentoService.getReportEstabelecimentosByDate(
      moment(this.dataInicial._selected).format('DD/MM/YYYY'),
      moment(this.dataFinal._selected).format('DD/MM/YYYY'))
      .subscribe((data) => {
        Tools.openPDFFile(data);
      }, (err) => {
        Tools.openErrorDoGeneratePDFFile(err)
      })
  }
  onResize(event) {
    if (event.target.innerWidth > 800) {
      this.displayedColumns = ['select', 'id', 'razao_social', 'nome_fantasia', 'cnpj_cpf', 'options'];
    } else if (event.target.innerWidth > 600 && event.target.innerWidth <= 800) {
      this.displayedColumns = ['select', 'razao_social', 'nome_fantasia', 'options']
    } else if (event.target.innerWidth <= 600) {
      this.displayedColumns = ['select', 'razao_social', 'options']
    }


  }
}


