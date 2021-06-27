import { Component, OnInit,ViewChild } from '@angular/core'
import {AutenticacaoService} from '../autenticacao.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService) { }

  @ViewChild('publicacoes') public publicar: any

  ngOnInit(): void {  }

  public sair(): void{
    this.autenticacaoService.logout()

  }

  public atualizarTimeLine(): void{
    this.publicar.atualizarTimeLine()
  }
}
