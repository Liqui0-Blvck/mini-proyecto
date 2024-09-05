import React, { useState } from 'react'
import Card, { CardBody, CardHeader, CardTitle } from '../../../../components/ui/Card'
import { RootState } from '../../../../store/rootReducer'
import { useAppSelector } from '../../../../store'
import useColorApp from '../../../../hooks/useColorApp'
import { IChartProps } from '../../../../components/Chart'
import TablaHistoricaEjercicio from './TablaHistoricaEjercicio.table'
import MuscleCanvas from '../../../../components/MuscleApi'
import { muscles } from '../../../../utils/musclesJson'

import GenderButtons, { TABS_GENDER, TTabsGenders } from './ButtonsGender'
import BodyButtons, { TABS_BODYS, TTabsBodys } from './ButtonsBody'


const HistorialEjercicios = () => {
  const { miembro } = useAppSelector((state: RootState) => state.miembro.miembro)
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

  const handleMuscleClick = (muscleName: string) => {
      alert(`Músculo clicado: ${muscleName}`);
  };

  const handleMuscleHover = (muscleName: string | null) => {
      console.log(`Músculo en hover: ${muscleName}`);
      
  };

  const [activeTabs, setActiveTabs] = useState<TTabsGenders>(TABS_GENDER.MALE)
  const [activeBodyTabs, setActiveBodyTabs] = useState<TTabsBodys>(TABS_BODYS.FRONT)


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
            <CardBody className='bg-[#E7ECEF] overflow-auto rounded-md p-2 flex flex-col justify-center items-center' style={{ border: `1px solid ${bordeColor}`}}>
              <div className='w-full flex justify-between '>
                <GenderButtons activeTab={activeTabs} setActiveTab={setActiveTabs}/>
                <BodyButtons activeTab={activeBodyTabs} setActiveTab={setActiveBodyTabs}/>
              </div>  
              <MuscleCanvas 
                imageUrl={
                  activeTabs.text === 'Masculino' 
                  ? (activeBodyTabs.text === 'Frontal' ? muscles.men.front.imageUrl : muscles.men.back.imageUrl)
                  : activeTabs.text === 'Femenino'
                    ? (activeBodyTabs.text === 'Frontal' ? muscles.women.front.imageUrl : muscles.women.back.imageUrl)
                    : ''
                } 
                muscles={
                  activeTabs.text === 'Masculino' 
                  ? (activeBodyTabs.text === 'Frontal' ? muscles.men.front.muscles : muscles.men.back.muscles)
                  : activeTabs.text === 'Femenino'
                    ? (activeBodyTabs.text === 'Frontal' ? muscles.women.front.muscles : muscles.women.back.muscles)
                    : []
                } 
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