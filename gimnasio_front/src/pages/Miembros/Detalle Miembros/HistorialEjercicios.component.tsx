import React, { useState } from 'react'
import Card, { CardBody, CardHeader, CardTitle } from '../../../components/ui/Card'
import Label from '../../../components/form/Label'
import Validation from '../../../components/form/Validation'
import FieldWrap from '../../../components/form/FieldWrap'
import Input from '../../../components/form/Input'
import { RootState } from '../../../store/rootReducer'
import { useAppSelector } from '../../../store'
import useColorApp from '../../../hooks/useColorApp'
import Modal, { ModalBody, ModalHeader } from '../../../components/ui/Modal'
import Button from '../../../components/ui/Button'
import Chart, { IChartProps } from '../../../components/Chart'
import colors from 'tailwindcss/colors';
import TablaHistoricaEjercicio from './TablaHistoricaEjercicio.table'
import MuscleCanvas from '../../../components/MuscleApi'

import imageUrl from '/src/assets/MuscleApi.png'; // Asegúrate de colocar la ruta correcta a tu imagen

const HistorialEjercicios = () => {
  const { miembro } = useAppSelector((state: RootState) => state.miembro.miembro)
  const [openModalPreferences, setOpenModalPreferences] = useState(false)
  const { colorApp } = useColorApp()
  const bordeColor = colorApp && colorApp === 'amber' ? '#F59E0B' : colorApp === 'emerald' ? '#059669' : colorApp

  const data = {
    attendanceCount: [7, 3], // 7 días asistió, 3 días no asistió
    labels: ['Asistió', 'No Asistió']
  };

  const chartOptions: IChartProps['options'] = {
    chart: {
      id: 'attendance-pie-chart',
      type: 'pie',
    },
    labels: data.labels,
    colors: ['#3B82F6', '#EF4444'], // Tailwind's blue-500 and red-500
    legend: {
      position: 'bottom',
      labels: {
        colors: '#6B7280', // Tailwind's zinc-500
      },
    },
    title: {
      text: 'Distribución de Asistencia',
      align: 'center',
      style: {
        fontSize: '20px',
        color: '#6B7280', // Tailwind's zinc-500
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const chartSeries: IChartProps['series'] = data.attendanceCount;

  // path: `M 179 174 
  // C 235 145, 205 116, 260 130 
  // Q 284 133 262 180 
  // Q 248 220 182 176 Z`,

  const musclesData = [

    {
      name: 'traps',
      path: `M 254 116
      L 254 102
      Q 240 113, 215 115
      Q 213 123, 204 122
      Q 210 120, 225 126
      Q 248 128, 240 122 Z
      `,
      controlPoints: [
      ],
    },

    {
      name: 'traps',
      path: `M 309 102
      L 309 120
      Q 314 129, 308 125
      Q 345 123, 327 122
      Q 338 116, 306 112
      S 300 112, 292 105 Z
      `,
      controlPoints: [
      ],
    },

    {
      name: 'chest',
      path: `M 179 174 
      C 235 146, 205 116, 257 129
      Q 282 129 263 175
      Q 250 223 188 179
      Q 185 170, 171 174 Z
      `,
      controlPoints: [
      ],
      controlColor: 'green'
    },

    {
      name: 'chest',
      path: `M 282.3 174 
      L 282.3 140
      Q 280 126, 286 125.7
      Q 343.2 130.5, 329.9 152.7
      S 350.6 176.8, 355.3 173
      Q 362.2 176.2, 328 190.5
      Q 321 210, 278 192.3
      S 272 192, 264.3 176  Z
      `,
      controlPoints: [
      ],
      controlColor: 'green'
    },
    
    {
      name: 'obliques',
      path: `M 198 180 
      Q 203 198, 188 207 
      Q 200 225, 208 255 
      L214 307 
      Q 250 305, 229 262
      S 226 240, 232 230
      L244 220 Z
      `, // Ajusta el path según sea necesario
      controlPoints: [
      ],
      controlColor: 'green'
    },

    {
      name: 'front-shoulders',
      path: `M 159 178
      Q 173 109, 229 126
      C 189 156, 208 160, 167 175 Z
      `,
      controlPoints: [
      ],
    },

    {
      name: 'biceps',
      path: `M 160 178
      Q 115 235, 143 245
      Q 160 253, 182 212
      C 218 175, 168 172, 169 175 Z
      `,
      controlPoints: [
      ],

    },

    {
      name: 'forearms',
      path: `M 163 241
      Q 133 259, 132 222
      L 128 227
      T 120 233
      C 120 233, 110 243, 96 273
      Q 79 308, 83 308
      Q 78 320, 98 318  
      S 117 297, 126 290
      Q 156 256, 155 246 Z
      `,
      controlPoints: [
      ],
    },

    

    {
      name: 'quads',
      path: `M 210 330
      L 214 306
      Q 250 308, 252 372
      Q 270 381, 263 380 
      Q 275 432, 245 455
      L 255 485
      Q 234 531, 210 490
      S 192 500, 189 460
      C 190 440, 193 358, 197 339 Z
      `,
      controlPoints: [
      ],
    },

    {
      name: 'calves',
      path: `M 200 520
      Q 183 555, 185 600
      Q 196 617, 189 644
      Q 212 660, 212 642
      Q 225 622, 222 590
      L 242 578
      Q 245 570, 227 540
      L 240 528
      S 210 550, 196 523 Z
      `,
      controlPoints: [
      ],
    }
    // Puedes añadir más músculos aquí
];

  const handleMuscleClick = (muscleName: string) => {
      alert(`Músculo clicado: ${muscleName}`);
  };

  const handleMuscleHover = (muscleName: string | null) => {
      console.log(`Músculo en hover: ${muscleName}`);
      
  };


  return (
    <Card className='mt-2'>
      <CardBody>
        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-5'>
          <Card>
            <CardHeader><CardTitle>Historial de Ejercicios</CardTitle></CardHeader>
            <CardBody style={{ border: `1px solid ${bordeColor}`}}>
                <TablaHistoricaEjercicio />
            </CardBody>
          </Card>

          <Card>
            <CardHeader><CardTitle>Preferencias de Entrenamiento</CardTitle></CardHeader>
            <CardBody className='bg-[#E7ECEF] overflow-auto rounded-md p-2 flex justify-center items-center' style={{ border: `1px solid ${bordeColor}`}}>
              <MuscleCanvas 
                imageUrl={imageUrl} 
                muscles={musclesData} 
                onMuscleClick={handleMuscleClick}
                onMuscleHover={handleMuscleHover}/>

                {/* <MuscleCanvas 
                imageUrl={imageUrl} 
                muscles={musclesData} 
                onMuscleClick={handleMuscleClick}
                onMuscleHover={handleMuscleHover}/> */}
                {/* {
                  miembro?.preferencias_entrenamiento && Object.keys(miembro.preferencias_entrenamiento).length > 0
                    ? (
                      <div className='grid grid-cols-2 gap-5 border-purple-500'>
                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='objetivo_entranamiento'>Objetivo Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='objetivo_entranamiento'>{miembro?.preferencias_entrenamiento.objetivo_entrenamiento}</span>
                          </div>
                        </div>

                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='tipo_entrenamiento'>Tipo Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='tipo_entrenamiento'>{miembro?.preferencias_entrenamiento.tipo_entrenamiento_preferido}</span>
                          </div>
                        </div>

                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='frecuencia_entrenamiento'>Frecuencia Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='frecuencia_entrenamiento'>{miembro?.preferencias_entrenamiento.frecuencia_entrenamiento}</span>
                          </div>
                        </div>

                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='intensidad_entrenamiento'>Intensidad Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='intensidad_entrenamiento'>{miembro?.preferencias_entrenamiento.intensidad_entrenamiento}</span>
                          </div>
                        </div>

                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='duracion_entrenamiento'>Duración Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='duracion_entrenamiento'>{miembro?.preferencias_entrenamiento.duracion_entrenamiento}</span>
                          </div>
                        </div>

                        <div className='col-span-12 lg:col-span-6'>
                          <Label htmlFor='horario_entrenamiento'>Horario Entrenamiento</Label>
                          <div className={`p-2 rounded-md dark:bg-zinc-700 bg-zinc-100`}>
                            <span id='horario_entrenamiento'>{miembro?.preferencias_entrenamiento.horario_entrenamiento}</span>
                          </div>
                        </div>
                      </div>
                    )
                    : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <span className='text-3xl'>No tiene preferencias aún registradas</span>
                      </div>
                    )
                } */}
            </CardBody>
          </Card>
        </div>

        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-5 mt-10'>
         {/* <Card>
          <CardHeader><CardTitle>Tabla de Asistencia</CardTitle></CardHeader>
          <CardBody  style={{ border: `1px solid ${bordeColor}`}}>
            <TablaAsistencia />  
            hola
          </CardBody>
         </Card> */}

         {/* <Card>
          <CardHeader><CardTitle>Gráfico de Asistencias</CardTitle></CardHeader>
          <CardBody className='w-full h-full p-2' style={{ border: `1px solid ${bordeColor}`}}>
            <Chart
              series={chartSeries}
              options={chartOptions}
              type="pie"
              height={350}
            />
          </CardBody>
         </Card> */}

        </div>
      </CardBody>
    </Card>
  )
}

export default HistorialEjercicios