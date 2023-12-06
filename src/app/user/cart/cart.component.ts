import { Component, OnInit } from '@angular/core';
import { Gift } from 'src/app/models/gift.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private activatedroute: ActivatedRoute,private router:Router){

  }
cart:Gift[]=[];
gift: Gift = new Gift();
selectedGifts!: Gift[];
total:number=0;
giftDialog: boolean = false;

gifts: Gift[] = [];

submitted!: boolean;


 ngOnInit(): void {

  this.cart=JSON.parse(sessionStorage.getItem("cart")??"v");
  console.log(this.cart)
  for(let i=0;i<this.cart.length;i++){
    this.gift=this.cart[i];
      this.total+=this.cart[i].cost;
      console.log(this.total);
 }}

 openNew() {
  this.gift = new Gift();
  this.submitted = false;
  this.giftDialog = true;
}

 placeOrder(){
  if(this.cart.length<1){
    alert("your cart is empty");
    return;
  }
  else{
    this.giftDialog = true;
    this.router.navigate(["../placeOrder"],{relativeTo:this.activatedroute});
  }
  
}
deleteItem(gift:Gift){
  let id=gift.id;
 var newCart=this.cart.filter(p=>p.id!==id);
 this.cart=[...newCart];
 sessionStorage.setItem("cart",JSON.stringify(this.cart));
}}
