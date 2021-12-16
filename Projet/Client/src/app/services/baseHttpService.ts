import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseHttpService {
  protected baseUrl = 'http://localhost:3000';

  constructor(protected http: HttpClient) { }
}