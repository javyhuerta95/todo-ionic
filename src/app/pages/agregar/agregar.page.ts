import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';
  constructor(public deseosService: DeseosService,
              private route: ActivatedRoute) {
// listaId, debe de escribirse como se coloco en la ruta
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista(listaId);

  }

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const listaItem = new ListaItem(this.nombreItem);
    this.lista.items.push(listaItem);

    this.nombreItem = '';

    this.deseosService.guardarStorage();
  }

  cambioCheck(item: ListaItem) {
    const pendientes = this.lista.items
                        .filter(itemData => itemData.completado === false).length;
    console.log({pendientes})
    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.deseosService.guardarStorage();
    console.log(this.deseosService.lista);
  }
  ngOnInit() {
  }

  borrar(i: number) {
    console.log('borrar ' + i);
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }

}
