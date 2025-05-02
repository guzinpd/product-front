// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  // o back-end devolve o objeto Category em categoryPath
  categoryPath: Category;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  available: boolean;
  categoryId: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Em dev com proxy: chamadas relativas
  private productUrl  = '/products';
  private categoryUrl = '/category';

  constructor(private http: HttpClient) {}

  // LISTAGEM DE PRODUTOS
  listarProdutos(
    name?: string,
    available?: boolean,
    categoryName?: string,
    sortBy = 'id',
    orderBy = 'asc'
  ): Observable<Product[]> {
    let params = new HttpParams()
      .set('sortBy', sortBy)
      .set('orderBy', orderBy);

    if (name)         params = params.set('name', name);
    if (available !== undefined) params = params.set('available', available);
    if (categoryName) params = params.set('categoryName', categoryName);

    return this.http.get<Product[]>(this.productUrl, { params });
  }

  // GET POR ID
  getProduto(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }

  // CREATE
  criarProduto(body: ProductRequest): Observable<Product> {
    return this.http.post<Product>(this.productUrl, body);
  }

  // UPDATE
  atualizarProduto(id: number, body: ProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.productUrl}/${id}`, body);
  }

  // DELETE
  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productUrl}/${id}`);
  }

  // LISTAGEM DE CATEGORIAS
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }
}