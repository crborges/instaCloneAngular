import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router'
import { AutenticacaoService  } from "./autenticacao.service";

@Injectable({   providedIn: 'root'})
export class AutenticacaoGuard implements CanActivate{

    constructor(private autenticacaoService: AutenticacaoService){}

    canActivate(): boolean{
        return this.autenticacaoService.autenticado();
    }
}