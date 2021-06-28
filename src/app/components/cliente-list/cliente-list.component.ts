import {Component, OnInit} from '@angular/core';
import {Cliente} from 'src/app/models/cliente.model';
import {ClienteService} from 'src/app/services/cliente.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clientes?: Cliente[];
  id = '';
  nome = '';
  idade = '';
  cidade = '';
  anterior = '1';
  proximo = '1';
  total = '0';

  constructor(private clienteService: ClienteService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getTodosClientes();
  }

  getTodosClientes(): void {
    this.clienteService.getTodosClientes()
      .subscribe(
        data => {
          debugger
          this.clientes = data.results;
          this.anterior = data.links.previous;
          this.proximo = data.links.next;
          this.total = data.count;
        },
        error => {
          this.toastr.error("Não foi possível buscar os clientes, tente novamente.");
        });
  }


  buscar(pagina?: string): void {
    let ordenar = (<HTMLInputElement>document.getElementById('ordenar')).value;
    this.clienteService.buscar(this.id, this.nome, this.idade, this.cidade, ordenar, pagina)
      .subscribe(
        data => {
          this.clientes = data.results;
          this.anterior = data.links.previous;
          this.proximo = data.links.next;
          this.total = data.count;
        },
        error => {
          this.toastr.error("Não foi possível buscar os clientes, tente novamente.");
        });

  }

  excluirCliente(id: any): void {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.clienteService.delete(id)
        .subscribe(
          data => {
            this.toastr.success("Cliente excluído(a) com sucesso.");
            this.getTodosClientes();
          },
          error => {
            this.toastr.error("Não foi possível excluir o(a) cliente, tente novamente.");
          });
    }
  }

}
