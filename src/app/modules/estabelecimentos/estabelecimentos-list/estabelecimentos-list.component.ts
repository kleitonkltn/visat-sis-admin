import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-estabelecimentos-list',
  templateUrl: './estabelecimentos-list.component.html',
  styleUrls: ['./estabelecimentos-list.component.sass']
})
export class EstabelecimentosListComponent  {


  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
}


