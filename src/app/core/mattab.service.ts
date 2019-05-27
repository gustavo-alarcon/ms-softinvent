import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MattabService {

  public currentTab: string = "step-two";
 
  constructor() { }
  
  getCurrentTab(): string {
   return this.currentTab;
  }

}
