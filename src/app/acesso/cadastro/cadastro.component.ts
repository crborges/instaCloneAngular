import { Component, OnInit, EventEmitter ,Output} from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms"
import{Usuario} from '../../shared/usuario.model'
import {AutenticacaoService} from '../../autenticacao.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter()
  public formulario : FormGroup = new FormGroup({
    'email':  new FormControl(null,[Validators.required,Validators.email]),
    'nomeCompleto':  new FormControl(null,[Validators.required]),
    'usuario':  new FormControl(null,[Validators.required]),
    'senha':  new FormControl(null,[Validators.required])
    //E-mail Nome completo Nome de usuário Senha
  })

  

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }


  public cadastrarUsuario(): void{
    let usuario = new Usuario();
    usuario.email         =this.formulario.value.email
    usuario.nomeCompleto  =this.formulario.value.nomeCompleto
    usuario.usuario       =this.formulario.value.usuario
    usuario.senha         =this.formulario.value.senha
    
    this.autenticacaoService.cadastrarUsuario(usuario)
    .then(() => this.exibirPainelLogin())

 
  }

}
