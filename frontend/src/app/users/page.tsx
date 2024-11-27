'use client'

import { useGetUsersQuery } from "@/state/api"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Header } from "../(components)/Header"

const colums:GridColDef[]=[
    {field: "userId", headerName:"ID", width:90},
    {field: "name", headerName:"Nombre", width:200},
    {field: "email", headerName:"Email", width:200},
]

const page = () => {
    const {data: users, isError, isLoading}=useGetUsersQuery();

    if(isLoading){
        return <div className="py-4">Cargando...</div>
    }
    if(isError||!users){
        <div className="text-center text-red-500 py-4">
            Falla en la conexión
        </div>
    }
  return (

    <div className="flex flex-col">
        <Header name="Usuarios"/>
        <DataGrid rows={users} columns={colums} getRowId={(row)=>row.userId} checkboxSelection className="bg-white shadow rounded-lg border-gray-200 mt-5 !text-gray-700"/>
    </div>
  )
}

export default page