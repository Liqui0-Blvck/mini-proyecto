import React from 'react'
import TablaHistoricaPagos from './TablaHistoricaPagos.table'
import Card, { CardBody, CardHeader, CardTitle } from '../../../../components/ui/Card'
import { useAppSelector } from '../../../../store'
import { RootState } from '../../../../store/rootReducer'
import { suscripcion } from '../../../../demos/Suscripciones.demo'
import { format } from '@formkit/tempo'
import '../../../../styles/extraStyles.css';
import { getBorderColor } from '../../../../utils/borderColors.utils'
import useColorApp from '../../../../hooks/useColorApp'


const HistorialPagos = () => {
  const { gimnasio } = useAppSelector((state: RootState) => state.gimnasio.gimnasio)
  const { miembro } = useAppSelector((state: RootState) => state.miembro.miembro)
  const { colorApp } = useColorApp() 

  // Función para obtener el gradiente de fondo en RGB según el tipo de membresía
  function getCardClass(tipoMembresia: string) {
    switch (tipoMembresia) {
      case 'Premium':
        return 'card-premium';
      case 'Estándar':
        return 'card-estandar';
      case 'Básica':
        return 'card-basica';
      default:
        return ''; // Clase por defecto si no coincide
    }
  }

  
  return (
    <div className='flex flex-wrap gap-5 p-2'>
      <div className='flex lg:flex-row md:flex-row flex-col-reverse w-full gap-5'>
        <div
          style={{ border: `1px solid ${getBorderColor(colorApp)}`}}  
          className='lg:w-7/12 border rounded-md'>
          <TablaHistoricaPagos />
        </div>

        <div
          style={{ border: `1px solid ${getBorderColor(colorApp)}`}} 
          className={`lg:w-5/12 flex border rounded-md justify-center p-5`}>
          <Card
            className={`w-full lg:h-96 h-64 ${getCardClass(suscripcion.tipo_membresia)} `}
          >
            <CardBody className='grid grid-cols-6 grid-rows-3 gap-y-5'>
              <div className='flex items-center justify-center col-span-2'>
                <span className='text-4xl font-courier font-semibold'>{gimnasio?.nombre}</span>
              </div>

              <div className='lg:col-span-2'></div>

              <div className='flex flex-col items-center justify-center lg:col-span-2 col-span-3'>
                <span className='font-courier text-center text-sm'>Fecha Vencimiento</span>
                <span className='font-courier text-sm'>{format(suscripcion.fecha_inicio!, { date: 'medium' }, 'es')}</span>
              </div>

              <div className='flex items-center justify-center row-start-2 col-span-2'>
                <span className='lg:text-2xl font-courier'>Suscripción: </span>
              </div>

              <div className='flex items-center col-span-4 lg:justify-start justify-center'>
                <span className='font-courier lg:text-2xl  tracking-[0.40em] font-semibold'>{suscripcion.tipo_membresia}</span>
              </div>

              <div className='flex items-center row-start-3 col-span-6 lg:p-3'>
                <span className='font-courier lg:text-3xl font-semibold'>
                  {miembro?.perfil.usuario.first_name} {miembro?.perfil.usuario.second_name} {miembro?.perfil.usuario.father_last_name} {miembro?.perfil.usuario.mother_last_name}
                </span>
              </div>

            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HistorialPagos
