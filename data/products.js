import { centToDollar } from '../scripts/utils/money.js';

export function getProduct(productID){
  let matchingProduct;

  products.forEach((productsItem) => {
      if (productsItem.id === productID){
          matchingProduct = productsItem;
      }
  })

  return matchingProduct
}

// the reason to use classes instead of normal objects is that it has more features
class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetail) {
    this.id = productDetail.id
    this.image = productDetail.image
    this.name = productDetail.name
    this.rating = productDetail.rating
    this.priceCents = productDetail.priceCents
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${centToDollar(this.priceCents)}`;
  }

  extraInfoHtml() {
    return '';
  }
}

// to use the properties of the parent class in child class we use extends parentClass
class Clothing extends Product{
  sizeChartLink;

  constructor(productDetail) {
    // to use the constructor of the parent class:
    super(productDetail);

    this.sizeChartLink = productDetail.sizeChartLink;
  }

  // method overriding: because the same method is in parent class but we have it again in child, the one in child will be over written the parent one:
  extraInfoHtml() {
    // we can call the methods in parent as well with super:
    //todo: super.extraInfoHtml();

    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `;
  }
}

export let products = [];

export function loadProductsFetch(){
  const promise = fetch('https://supersimplebackend.dev/products').then((response) => {
    return response.json();
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if(productDetails.type === 'clothing'){
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    console.log('load products');
  });

  return promise;
}

export function loadProducts(itsFunction) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if(productDetails.type === 'clothing'){
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    console.log('load products');

    itsFunction();
  })

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
