import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/model/cliente.model';
import { Email } from 'src/app/shared/model/email.model';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { EmailService } from 'src/app/shared/service/email.service';
import { EmailFormComponent } from '../../email/email-form/email-form.component';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent implements OnInit {

  displayedColumns = ['categoria', 'nome', 'email', 'acoes'];
  status = ['INATIVO', 'ATIVO', 'SUSPENSO'];
  cliente!: Cliente;
  emails: Email[] = [];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public clienteService: ClienteService,
    public emailSerivce: EmailService
  ) { }

  ngOnInit(): void {
    const idCliente = this.activatedRoute.snapshot.paramMap.get('id');
    if (idCliente != null) {
      this.getClienteById(+idCliente);
    }
  }

  getClienteById(id: number) {
    this.clienteService.getClienteDetail(id)
      .subscribe(data => {
        this.cliente = data.cliente;
        this.emails = data.emails;
      });
  }

  deletarEmail(id: number) {
    this.emailSerivce.deleteEmail(id)
      .subscribe(data => {
        location.reload();
      })
  }

  deletarCliente(id: number) { 
    this.clienteService.deleteCliente(id)
      .subscribe(data => {
        this.router.navigate(['/']);
      })
  }

  retornar() {
    this.router.navigate(['/']);
  }

  addEmail(): void {
    this.dialog.open(EmailFormComponent, {
      width: '600px',
      data: {idCliente: this.cliente.id}
    });
  }

  editarCliente(cliente: Cliente): void {
    this.dialog.open(ClienteFormComponent, { 
      width: '600px',
      data: {cliente: cliente}
    });
  }

}
