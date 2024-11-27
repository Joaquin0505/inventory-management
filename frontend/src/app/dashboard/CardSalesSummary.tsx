import { useGetDashboardMetricsQuery } from "@/state/api"
import { TrendingUp } from "lucide-react";
import  React, { useState } from "react";
import { BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis , Bar } from "recharts";


export const CardSalesSummary = () => {
    const{data, isLoading, isError} = useGetDashboardMetricsQuery();
    const salesData = data?.salesSummary||[];
    const [timeframe, setTimeframe] = useState("weekly");
    const totalValueSun = salesData.reduce((acc, curr)=>acc+ curr.totalValue,0)||0;
    const averageChangePercentage = salesData.reduce((acc,curr,_,array)=>{
        return acc+curr.changePercentage!/array.length;
    },0)||0;
    const highestValueData = salesData.reduce((acc,curr)=>{
        return acc.totalValue>curr.totalValue ? acc : curr;
    },salesData[0]||{});

    const highestValueDate = highestValueData.date ? new Date (highestValueData.date).toLocaleDateString(
        "en-US",{
            month:"numeric",
            day:"numeric",
            year:"2-digit",
        }
    ):"N/A";
    if(isError){
        return <div className="m-5">Fallar en la lectura de datos</div>
    }



  return (
   <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
    {isLoading?(
        <div className="m-5">Cargando...</div>
    ):
    (
        <>
        <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
                Sales Summary
            </h2>
            <hr />
        </div>
        <div>
            <div className="flex justify-between items-center mb-6 px-7 mt-5">
                <div className="text-lg font-medium">
                    <p className="text-xs text-gray-400">
                        Valor</p>
                        <span className="text-2xl font-extrabold">
                            S/{(totalValueSun/1000).toLocaleString("es",{
                                maximumFractionDigits:2,
                            })} m                        
                        </span>
                        <span className="text-green-500 text-sm ml-2">
                            <TrendingUp className="inline w-4 h-4 mr-1"/>
                            {averageChangePercentage.toFixed(2)}%
                        </span>                    
                </div>
                <select name="" id="" className="shadow-sm border-gray-300 bg-white p-2 rounded" value={timeframe} onChange={(e)=>{
                    setTimeframe(e.target.value)
                }}>
                    <option value="daily">Dias</option>
                    <option value="weekly">Semanas</option>
                    <option value="monthly">Meses</option>
                </select>
            </div>
            <ResponsiveContainer width="100%" height={350} className="px-7">
                <BarChart data={salesData} margin={{top:0, right:0, left: -25, bottom:0}}>
                    <CartesianGrid strokeDasharray="" vertical={false}/>
                        <XAxis dataKey="date" tickFormatter={(value)=>{
                            const date =new Date (value);
                        return `${date.getMonth()+1}/${date.getDate()}`;
                        }}>    
                        </XAxis>
                        <YAxis tickFormatter={(value)=>{
                            return `S/${(value/1000000).toFixed(0)}m`;
                        }}
                        tick={{fontSize:12 , dx:-1}}
                        tickLine={false}
                        axisLine={false}/>
                            <Tooltip formatter={(value:number)=>[
                                `S/${value.toLocaleString("es")}`

                            ]} labelFormatter={(label)=>{
                                const date=new Date(label);
                                return date.toLocaleDateString("es-PE",{
                                    year:"numeric",
                                    month:"long",
                                    day:"numeric",
                                });
                            }}/>
                            <Bar dataKey="totalValue" fill='#3182ce' barSize={10}
                            radius={[10,10,0,0]}/>                       
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div>
            <hr />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
                <p>{salesData.length||0}dias</p>
                <p className="text-sm">
                    La mayor venta en esta fecha es: {" "}                    
                    <span className="font-bold">{highestValueDate}</span>
                </p>
            </div>
        </div>
        </>
    )}
   </div>
  )
}
