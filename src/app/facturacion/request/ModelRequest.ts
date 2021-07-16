export class CrearFacturaRequest {
    public fecha: string;
    public subtotal: number;
    public iva: number;
    public total: number;
    public idcliente: number;
    public detalle: CrearDetalleRequest[];
}

export class CrearDetalleRequest {
    public subtotal: number;
    public cantidad: number;
    public idproducto: number;
}

export class ActualizarFacturaRequest {
    public id: number;
    public fecha: string;
    public subtotal: number;
    public iva: number;
    public total: number;
    public idcliente: number;
    public detalle: ActualizarDetalleRequest[];
}

export class ActualizarDetalleRequest {
    public id?: number;
    public subtotal: number;
    public cantidad: number;
    public idfactura: number;
    public idproducto: number;
}
