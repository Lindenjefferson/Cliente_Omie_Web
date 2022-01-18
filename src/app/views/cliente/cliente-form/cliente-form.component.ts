import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/shared/model/cliente.model';
import { ClienteService } from 'src/app/shared/service/cliente.service';

export interface DialogData {
  cliente: Cliente
}

export interface Status {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  public clienteForm!: FormGroup;

  status: Status[] = [
    {value: 0, viewValue: 'INATIVO'},
    {value: 1, viewValue: 'ATIVO'},
    {value: 2, viewValue: 'SUSPENSO'},
  ];

  selectedStatus = this.status[1].value;

  constructor(
    public dialogRef: MatDialogRef<ClienteFormComponent>,
    private fb: FormBuilder,
    private api: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    if (this.data.cliente == null) {
      this.novoForm();
    } else {
      this.formComDados();
    }
  }

  novoForm(): void {
    this.clienteForm = this.fb.group({
      inscricao: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      apelido: [''],
      urlImagem: [''],
      status: this.selectedStatus,
      id: 0
    });
  }

  formComDados(): void {
    this.clienteForm = this.fb.group({
      inscricao: [this.data.cliente.inscricao, [Validators.required]],
      nome: [this.data.cliente.nome, [Validators.required]],
      apelido: [this.data.cliente.apelido],
      urlImagem: [this.data.cliente.urlImagem],
      status: [this.data.cliente.status],
      id: [this.data.cliente.id]
    });
  }

  add(): void {
    console.log(this.clienteForm.value);
    this.api.saveCliente(this.clienteForm.value).subscribe(result => {
      this.dialogRef.close(true);
      this.clienteForm.reset();
      location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
