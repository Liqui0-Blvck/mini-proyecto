import React, { useEffect, useState } from 'react'
import Card, { CardBody, CardHeader, CardTitle } from '../../../../components/ui/Card'
import { RootState } from '../../../../store/rootReducer'
import { useAppSelector } from '../../../../store'
import useColorApp from '../../../../hooks/useColorApp'
import { IChartProps } from '../../../../components/Chart'
import TablaHistoricaEjercicio from './TablaHistoricaEjercicio.table'
import MuscleCanvas from '../../../../components/MuscleBody'
import { muscles, muscles_back } from '../../../../utils/musclesJson'

import GenderButtons, { TABS_GENDER, TTabsGenders } from './ButtonsGender'
import BodyButtons, { TABS_BODYS, TTabsBodys } from './ButtonsBody'
import { set } from 'lodash'


const HistorialEjercicios = () => {
  const { miembro } = useAppSelector((state: RootState) => state.miembro.miembro)
  const { colorApp } = useColorApp()
  const bordeColor = colorApp && colorApp === 'amber' ? '#F59E0B' : colorApp === 'emerald' ? '#059669' : colorApp
  const [activeTabs, setActiveTabs] = useState<TTabsGenders>(TABS_GENDER.MALE)
  const [activeBodyTabs, setActiveBodyTabs] = useState<TTabsBodys>(TABS_BODYS.FRONT)
  const [highlightedMuscle, setHighlightedMuscle] = useState<string | null>(null);


  useEffect(() => {
    if (miembro?.perfil?.genero === 'Femenino') {
      setActiveTabs(TABS_GENDER.FEMALE)
    } else {
      setActiveTabs(TABS_GENDER.MALE)
    }
  }, [miembro])


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
      setHighlightedMuscle(muscleName);
  };


  const handleRowClick = (muscleName: string) => {
      setHighlightedMuscle(muscleName);
      if (muscles_back.includes(muscleName)) {
        setActiveBodyTabs(TABS_BODYS.BACK)
      } else {
        setActiveBodyTabs(TABS_BODYS.FRONT)
      }
  };


  return (
    <Card className='mt-2'>
      <CardBody>
        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-5'>
          <Card>
            <CardHeader><CardTitle>Historial de Ejercicios</CardTitle></CardHeader>
            <CardBody style={{ border: `1px solid ${bordeColor}`}}>
                <TablaHistoricaEjercicio onRowClick={handleRowClick} highlightedMuscle={highlightedMuscle!} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader><CardTitle>Preferencias de Entrenamiento</CardTitle></CardHeader>
            <CardBody className='bg-[#E7ECEF] overflow-auto mx-0 rounded-md p-2 flex flex-col justify-center items-center' style={{ border: `1px solid ${bordeColor}`}}>
              <div className='w-full flex lg:flex-row md:flex-row flex-col justify-between gap-3 mb-2'>
                <GenderButtons activeTab={activeTabs} setActiveTab={setActiveTabs}/>
                <BodyButtons activeTab={activeBodyTabs} setActiveTab={setActiveBodyTabs}/>
              </div>

              <div >
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
                highlightedMuscle={highlightedMuscle!}
                />
              </div>

             
            </CardBody>
          </Card>
        </div>

      </CardBody>
    </Card>
  )
}

export default HistorialEjercicios