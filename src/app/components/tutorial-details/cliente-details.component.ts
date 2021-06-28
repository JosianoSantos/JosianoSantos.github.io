import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'cliente-detail-details',
  templateUrl: './cliente-details.component.html',
  styleUrls: ['./cliente-details.component.css']
})
export class ClienteDetailsComponent implements OnInit {

  cliente: Cliente = {
    nome: '',
    idade: '',
    cidade: ''
  };
  message = '';

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getDetalhesCliente(this.route.snapshot.params.id);
  }

  getDetalhesCliente(id: string): void {
    this.clienteService.getDetalhesCliente(id)
      .subscribe(
          (data: any) => {
          this.cliente = data;
          console.log(data);
        },
          (error: any) => {
          console.log(error);
        });
  }

  atualizarCliente(): void {
    this.message = '';

    this.clienteService.update(this.cliente.id, this.cliente)
      .subscribe(
        (response:any) => {
          console.log(response);
          this.message = response.message ? response.message : 'This tutorial was updated successfully!';
        },
        (error:any) => {
          console.log(error);
        });
  }

  excluirCliente(): void {
    this.clienteService.delete(this.cliente.id)
      .subscribe(
        (response:any) => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        (error:any) => {
          console.log(error);
        });
  }

}
