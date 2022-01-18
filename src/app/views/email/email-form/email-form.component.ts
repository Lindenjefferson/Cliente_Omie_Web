import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from 'src/app/shared/service/email.service';

export interface DialogData {
  idCliente: number;
}

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  public emailForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmailFormComponent>,
    private fb: FormBuilder,
    private api: EmailService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      categoria: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      idCliente: this.data.idCliente
    });
  }

  add(): void {
    this.api.saveEmail(this.emailForm.value).subscribe(result => {
      this.dialogRef.close(true);
      this.emailForm.reset();
      location.reload();
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
