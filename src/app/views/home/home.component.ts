import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente.model';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteFormComponent } from '../cliente/cliente-form/cliente-form.component';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  clientes: Cliente[] = [];
  displayedColumns = ['inscricao', 'nome', 'apelido', 'status', 'acoes'];
  status = ['INATIVO', 'ATIVO', 'SUSPENSO'];
  size: number = 0;
  totalElements: number = 0;
  pageEvent: PageEvent = new PageEvent;

  constructor(
    public dialog: MatDialog,
    public clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClientes(0);
  }

  onPaginate(pageEvent: PageEvent) {
    this.getClientes(pageEvent.pageIndex);
  }

  getClientes(page: number) {
    this.clienteService.getClientesWithPage(page)
      .subscribe(data => {
        this.clientes = data.content;
        this.size = data.size;
        this.totalElements = data.totalElements;
      });
  }

  addCliente(): void {
    this.dialog.open(ClienteFormComponent, { 
      width: '600px',
      data: {cliente: null}
    });
  }

  detalhar(id: number) {
    this.router.navigate(['/cliente', id]);
  }

}
