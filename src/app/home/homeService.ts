import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Node } from "../models/node";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  // URL to web api
  private nodeUrl = 'http://localhost:5000/api/node';
  constructor(private http: HttpClient) { }

  getNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(this.nodeUrl);
  }

  getNodesById(id: any): Observable<Node> {
    return this.http.get<Node>(`${this.nodeUrl}/${id}`);
  }

//   addProduct(product: Product): Observable<any> {
//     return this.http.post<any>(this.productUrl, product, httpOptions);
//   }

//   updateProductById(product: Product, id: any): Observable<Product> {
//     return this.http.put<Product>(`${this.productUrl}/${id}`, product, httpOptions);
//   }

//   deleteProductById(id: any): Observable<Product> {
//     return this.http.delete<Product>(`${this.productUrl}/${id}`);
//   }

}
