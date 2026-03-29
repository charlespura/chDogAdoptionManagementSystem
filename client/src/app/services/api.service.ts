import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = 'http://localhost:4000/graphql';

  async request<T>(query: string, variables: Record<string, unknown> = {}, token?: string | null): Promise<T> {
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    const response = await firstValueFrom(
      this.http.post<{ data?: T; errors?: { message: string }[] }>(
        this.endpoint,
        { query, variables },
        { headers }
      )
    );

    if (response.errors?.length) {
      throw new Error(response.errors[0].message);
    }

    if (!response.data) {
      throw new Error('No data returned from API');
    }

    return response.data;
  }
}
