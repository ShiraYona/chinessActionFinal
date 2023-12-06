import { Component, OnInit } from '@angular/core';
import { Gift } from 'src/app/models/gift.model';
import { GiftsService } from 'src/app/services/gifts.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-gifts-list',
  templateUrl: './user-gifts-list.component.html',
  styleUrls: ['./user-gifts-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserGiftsListComponent implements OnInit{
  giftDialog: boolean = false;

  gifts: Gift[] = [];

  gift: Gift = new Gift();

  selectedGifts!: Gift[];

  submitted!: boolean;

  cart:Gift[]=[];

  constructor(
    public giftService: GiftsService, private messageService: MessageService, private confirmationService: ConfirmationService,private activatedroute: ActivatedRoute,private router:Router
  ) { }

  ngOnInit() {
    if(sessionStorage.getItem("cart")){
      this.cart=JSON.parse(sessionStorage.getItem("cart")??"v");
    }
    this.giftService.reloadGifts$.subscribe(x => {
        this.giftService.getGifts().subscribe(data => this.gifts = data);
    });
  }

  
addToCart(gift:Gift) {
  this.cart.push(gift);
  sessionStorage.setItem("cart",JSON.stringify(this.cart) );
  
 }
 
 goToCart(){
 
  this.router.navigate(["../cart"],{relativeTo:this.activatedroute});
}
}
