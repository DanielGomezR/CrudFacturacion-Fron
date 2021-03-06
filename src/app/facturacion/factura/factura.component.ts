import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../services/factura/factura.service';
import { FacturaModel } from '../models/FacturaModel';
import { HttpErrorResponse } from '@angular/common/http';
import { FacturaDetalleComponent } from '../factura-detalle/factura-detalle.component';
import {MatDialog} from '@angular/material/dialog';
import { SwalertServiceService } from 'src/app/utils/swalert-service.service';
import Swal from 'sweetalert2';
import { faPlus,faEye,faEdit,faEraser } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: "app-factura",
  templateUrl: "./factura.component.html",
  styleUrls: ["./factura.component.css"],
})
export class FacturaComponent implements OnInit {

   // Fa Fa-incosn
   i_faPlus=faPlus;
   i_faEye=faEye;
   i_faEdit=faEdit;
   i_faEraser=faEraser;

  constructor(
    private _facturaService: FacturaService,
    public dialog: MatDialog,
    private _swalAlertService: SwalertServiceService
  ) {}

  dataFacturas: FacturaModel[] = [];

  ngOnInit(): void {
    this.CargarFacturas();
  }

  CargarFacturas(): void {
    this._facturaService.ListarFacturas().subscribe(
      (result: FacturaModel[]) => {
        this.dataFacturas = result;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  ModalAgregarFactura(): void {
    const crearRef = this.dialog.open(FacturaDetalleComponent, {
      height: "85%",
      width: "750px",
    });

    crearRef.afterClosed().subscribe((result) => {
      if (result) {
        this.CargarFacturas();
      }
    });
  }

  ModalEditarFactura(factura: FacturaModel): void {
    const editarRef = this.dialog.open(FacturaDetalleComponent, {
      data: factura,
      height: "600px",
      width: "750px",
    });

    editarRef.afterClosed().subscribe((result) => {
      if (result) {
        this.CargarFacturas();
      }
    });
  }

  EliminarFactura(id: number): void {
    this._swalAlertService
      .question(
        "¿Seguro desea anular la factura?",
        "No podra recuperar la factura anulada",
        "Si, Anular"
      )
      .then((result) => {
        if (result.value == true) {
          this._facturaService.EliminarFactura(id).subscribe(
            (result) => {
              this.dataFacturas = this.dataFacturas.filter((f) => f.id != id);
              Swal.fire(
                "Anulada!",
                "La Factura ha sido anulada",
                "success"
              );
            },
            (error: HttpErrorResponse) => {
              Swal.fire("Error al anular!", `${error.error}`, "error");
            }
          );
        } else {
          return;
        }
      });
  }
}
