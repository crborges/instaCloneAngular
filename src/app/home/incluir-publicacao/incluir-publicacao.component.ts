import { Component, OnInit,EventEmitter,Output} from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms"
import{Router} from '@angular/router'
import {Bd} from '../../bd.service'
import firebase from 'firebase';
import {Progresso} from '../../progresso.service'
import { Observable, Subject } from 'rxjs';
import { Postagem } from 'src/app/shared/postagem.model';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email : string =''
  private imagem: any

  public progressoPublicacao: string = "pendente"
  public porcentagemUpload: number =0
 
   @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()
  
  constructor(private router: Router,private banco: Bd, private progresso:Progresso){}


  public formulario : FormGroup = new FormGroup({
    'titulo':  new FormControl(null,[Validators.required,Validators.minLength(10)]),
    'content':  new FormControl(null,[Validators.required,Validators.minLength(10)])
  })
  
      
  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user)=>{
       this.email =''+user?.email
    })
  }
  public postar (): void{
    //console.log('titulo === '+this.formulario.value.titulo+' conteudo == '+this.formulario.value.content)

    let postagem = new Postagem()
    postagem.email = this.email
    postagem.titulo = this.formulario.value.titulo
    postagem.conteudo = this.formulario.value.content
    postagem.imagem = this.imagem[0]

    this.banco.publicar(postagem)
    
    this.progressoPublicacao = 'concluido'
    //emitir evento apra o componente pai para fazer parte das estrategia de ao postar atualizara  timeline
    this.atualizarTimeLine.emit()
  
}

   public preparaImagemUpload(event: Event): void{
    this.imagem=(<HTMLInputElement>event.target).files
   }


}
