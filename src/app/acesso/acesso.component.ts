import { Component, OnInit } from '@angular/core';
import {trigger,state, style, transition, animate,keyframes} from  '@angular/animations'
@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [

    trigger('animacao-banner',[
      state('criado',style({opacity:1})),
      transition('void =>criado',[
        style({opacity:0,transform:'translate(-50px,-50px)'}),
        animate('500ms 1s ease-in-out')
      ])
    ]),
    
    trigger('animacao-painel',[
      state('criado',style({opacity:1})),  
      transition('void =>criado',[
        style({opacity:0,transform:'translate(50px,-50px)'}),
        animate('1.5s 1s ease-in-out',
          keyframes([
            style({offset:0.15, opacity:1, transform: 'translateX(0)'}),
            style({offset:0.70, opacity:1, transform: 'translateX(0)'}),
            
            style({offset:0.72, opacity:1, transform: 'translateY(-10px)'}),
            style({offset:0.74, opacity:1, transform: 'translateY(10px)'}),
            style({offset:0.76, opacity:1, transform: 'translateY(-10px)'}),
            style({offset:0.78, opacity:1, transform: 'translateY(10px)'}),
            style({offset:0.80, opacity:1, transform: 'translateY(-10px)'}),
            style({offset:0.82, opacity:1, transform: 'translateY(10px)'}),
            style({offset:0.84, opacity:1, transform: 'translateY(-10px)'}),
            style({offset:0.86, opacity:1, transform: 'translateY(10px)'}),
            style({offset:0.88, opacity:1, transform: 'translateY(-10px)'}),
            style({offset:0.90, opacity:1, transform: 'translateY(10px)'}),
            
            style({offset:1, opacity:1, transform: 'translateX(0)'})   //um key frame é um momento dentro do tempo de animacao que vai acontecer algo e aqui configuramos isso
          ])
        )
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = "criado"
  public estadoPainel: string = "criado"

  public cadastro: boolean = false

  constructor() { }

  ngOnInit() {
  }
  public exibirPainel(event: string): void {
      console.log('rebi aqui '+event)
    this.cadastro = event === 'cadastro' ? true : false
  }


  public inicioDaAnimacao(): void{
    console.log('startei a animacao')
  }

  public fimDaAnimacao(): void{
    console.log('finalizei a animacao')
  }
}


