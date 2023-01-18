import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})
export class PdfViewerPage implements OnInit {
  pdfSrc;
  data;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.data = JSON.parse(params['data']);
      this.pdfSrc =
        '/assets/pdfs/CuentaPdfs/' + JSON.parse(params['data']).filename;
    });
  }
  goBackToComandaPage() {
    if(this.data.comandaId == undefined){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          mesa: JSON.stringify(this.data.mesa),
        },
      };
      this.router.navigate(['/comandas'], navigationExtras);
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        dataFromPdfViewer: JSON.stringify(this.data),
      },
    };
    this.router.navigate(['/cobrar'], navigationExtras);
  }
}
