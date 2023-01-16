import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdf-viewer-factura',
  templateUrl: './pdf-viewer-factura.page.html',
  styleUrls: ['./pdf-viewer-factura.page.scss'],
})
export class PdfViewerFacturaPage implements OnInit {
  pdfSrc;
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.pdfSrc = '/assets/pdfs/FacturaPdfs/' + JSON.parse(params['filename']);
    });
  }
}
