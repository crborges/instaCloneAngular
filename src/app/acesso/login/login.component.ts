import { Component, OnInit,EventEmitter ,Output} from '@angular/core'
import {FormGroup,FormControl,Validators} from "@angular/forms"
import {AutenticacaoService} from '../../autenticacao.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter()

  public formulario : FormGroup = new FormGroup({
    'email':  new FormControl(null,[Validators.required,Validators.email]),
    'senha':  new FormControl(null,[Validators.required,Validators.minLength(6)])
  })

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }


  public logarUsuario(): void{
    console.log('Loguie na aplicação com usuario: '+this.formulario.value.email+' senha: '+this.formulario.value.senha)
   
    this.autenticacaoService.logarUsuario(this.formulario.value.email,this.formulario.value.senha)
  }
}
