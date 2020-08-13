import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Tools {

  public static openPDFFile(response: any) {
    const objetctLinkHtml = document.createElement('a');
    const file = response.body
    const fileURL = URL.createObjectURL(file);
    objetctLinkHtml.href = fileURL;
    objetctLinkHtml.target = '_blank';
    objetctLinkHtml.click();
    objetctLinkHtml.remove();
  }
  public static openErrorDoGeneratePDFFile(err: any) {
    const file = new Blob([err.error], { type: 'application/json' });
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      const errorMsg = JSON.parse(reader.result.toString());
      alert('Erro ao gerar arquivo PDF:\n' + errorMsg.message);
    };
  }

}
