"use client"

import { useGetProductsQuery } from "@/state/api"
import { Header } from "../(components)/Header"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const columns:GridColDef[]=[
    {field: 'productId', headerName:"ID", width:90},
    {field: "name", headerName:"Nombre del Producto", width:200},
    {field: "price", headerName:"Precio", width:110, type:"number", 
        valueGetter:(value,row)=>`S/.${row.price}`
    },
    {field: "rating", headerName:"Popularidad", width:110,
        type:"number",
        valueGetter:(value,row)=>(row.rating?row.rating:"N/A")
    },
    {field: "stockQuantity", headerName:"Cantidad de Stock", width:200,type:"number"},
]

const page = () => {
    const {data:products, isError, isLoading}= useGetProductsQuery();

    if(isLoading){
        return <div className="py-4">Cargando...</div>
    }
    if(isError|| !products){
        return(
            <div className="text-center text-red-500 py-4">
                Falla en traer información de productos
            </div>
        );
    }

  return (
    <div className="flex flex-col">
        <Header name="Inventario"/>
        <DataGrid rows={products} columns={columns} getRowId={(row)=>row.productId} checkboxSelection className="bg-white shadow-lg rounded-lg border-gray-200 mt-5 !text-gray-700"/>
    </div>
  )
}

export default page