import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pdf-viewer-factura',
  templateUrl: './pdf-viewer-factura.page.html',
  styleUrls: ['./pdf-viewer-factura.page.scss'],
})
export class PdfViewerFacturaPage implements OnInit {
  pdfSrc;
  data;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   this.pdfSrc =
    //     '/assets/pdfs/FacturaPdfs/' + JSON.parse(params['filename']);
    // });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.data = JSON.parse(params['data']);
      this.pdfSrc =
        '/assets/pdfs/FacturaPdfs/' + JSON.parse(params['data']).filename;
    });
  }
  goBackToComandaPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        dataFromPdfViewer: JSON.stringify(this.data),
      },
    };
    this.router.navigate(['/cobrar'], navigationExtras);
  }
}
