import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tests-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  ngOnInit(): void {
    
  }
  productName = '';
  products = ['An apple', 'An orange'];

  onAddProduct(form) {
    console.log(form );
    this.products.push(this.productName);
  }
  onRemoveProduct(product: string) {
    this.products = this.products.filter(prod => prod !== product);
  }

}
