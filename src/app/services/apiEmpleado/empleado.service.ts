import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empleado } from 'src/app/model/user/Empleado';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService extends ApiService<Empleado> {
  base64 = 'data:image/png;base64,';
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Empleado';
  }
  // get image
  getImage(
    id: string | number,
    imageName: string | number
  ): Observable<string | object> {
    var endpoint = `${this.apiUrl}/GetImage`;
    return this.httpClient
      .get(`${endpoint}?id=${id}&imageName=${imageName}`)
      .pipe(catchError(this.handleError));
  }
  UpladImage(id: string, fileToUpload: any): any {
    // headers
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `${sessionStorage.getItem('token')!}`
      ),
    };

    // fin headers
    var endpoint = `${this.apiUrl}/UploadImage`;

    const formdata = new FormData();
    // const read = new FileReader();
    // read.onload = () => {
    // const blob = new Blob([read.result], {
    //   type: fileToUpload.type,
    // });
    formdata.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(`${endpoint}?p_oid=${id}`, formdata, header)
      .pipe(
        catchError((err) => {
          console.log('Upload error', err);
          return err;
        })
      );
    // };
  }

  // Endpoint: Modify without password
  updateWithoutPassword(
    idName: string,
    id: string | number,
    resource: Empleado
  ) {
    var endpoint = `${this.apiUrl}/ModificarSinPass`;
    const headers = new HttpHeaders().set(
      'Authorization',
      sessionStorage.getItem('token') || ''
    );
    if (headers.get('Authorization') == '') {
      return of(false);
    }
    const x = headers.get('Authorization');
    return this.httpClient
      .put(`${endpoint}?${idName}=${id}`, resource, { headers })
      .pipe(catchError(this.handleError));
  }

  // Convert base 64 to blob
  private convertBase64ToBlob(base64: string) {
    const info = this.getInfoFromBase64(base64);
    const sliceSize = 512;
    const byteCharacters = window.atob(info.rawBase64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: info.mime });
  }

  // get info from base 64
  private getInfoFromBase64(base64: string) {
    const meta = base64.split(',')[0];
    const rawBase64 = base64.split(',')[1].replace(/\s/g, '');
    const mime = /:([^;]+);/.exec(meta)[1];
    const extension = /\/([^;]+);/.exec(meta)[1];

    return {
      mime,
      extension,
      meta,
      rawBase64,
    };
  }
}
