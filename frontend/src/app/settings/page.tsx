'use client'

import React, {useState} from "react"
import { Header } from "../(components)/Header"

type UserSetting = {
    label:string;
    value:string|boolean;
    type:"text"|"toggle";
}

const mockSettings:UserSetting[]=[
    {label:"Username", value:"Jhonatan", type:"text"},
    {label:"Email", value:"jsaune@senati.pe", type:"text"},
    {label:"Notificacion", value:true, type:"toggle"},
    {label:"Dark Mode", value:false, type:"toggle"},
    {label:"Languaje", value:"English", type:"text"},
];


const page = () => {
    const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings)
    const handlerToggleChange = (index:number)=>{
        const settingCopy = [ ...userSettings ];
        settingCopy[index].value = !settingCopy[index].value as boolean
        setUserSettings(settingCopy)
    }
  return (
    <div className="w-full">
        <Header name="Configuración de usuario"/>
        <div className="overflow-x-auto mt-5 shadow-md">
            <table className="min-w-full bg-white rounded-lg">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold">
                            Configuración
                        </th>
                        <th className="text-left py-3 px-4 uppercase font-semibold">
                            Valor
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userSettings.map((setting,index)=>(
                        <tr className="hover:bg-blue-500" key={setting.label}>
                            <td className="py-2 px-4">{setting.label}</td>
                            <td className="py-2 px-4">
                                {setting.type==="toggle"?(
                                    <label htmlFor="" className="inline-flex relative items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={setting.value as boolean} onChange={()=>handlerToggleChange(index)}/>
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer
                                        peer-focus:ring-blue-400 peer-focus:ring-4 transition 
                                        peer-checked:border-white
                                        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                        after:bg-white after:border-gray-300
                                        after:border after:rounded-full after:h-5 after:w-5 
                                        after:transition-all peer-checked:bg-blue-600 ">
                                </div>
                                    </label>
                                ):(
                                    <input type="text" className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500" value={setting.value as string} 
                                    onChange={(e)=>{
                                        const settingsCopy =[...userSettings];
                                        settingsCopy[index].value=e.target.value;
                                        setUserSettings(settingsCopy);
                                    }}/>
                                )}
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default page