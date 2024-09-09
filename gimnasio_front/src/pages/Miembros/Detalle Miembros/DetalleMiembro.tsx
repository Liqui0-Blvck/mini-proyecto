import React, { useEffect, useState } from 'react'
import MiembrosGimnasioButtons, { TAB_MIEMBROS_GYM, TTabMiembros } from './MiembrosGimnasioButtons'
import Container from '../../../components/layouts/Container/Container'
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store'
import {obtener_miembro_dueno } from '../../../store/slices/miembros/miembrosPeticiones'
import { RootState } from '../../../store/rootReducer'
import InfoPersonal from './Informacion Personal/InfoPersonal.component'
import HistorialEjercicios from './Historial Ejercicios/HistorialEjercicios.component'
import HistorialPagos from './Historial Pagos/HistorialPagos'


const DetalleCliente = () => {
  const [activeTabs, setActiveTabs] = useState<TTabMiembros>(TAB_MIEMBROS_GYM.INFO_PERSONAL)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state: RootState) => state.auth.session)

  useEffect(() => {
    dispatch(obtener_miembro_dueno({ id, token }))
  }, [])


  return (
    <Container breakpoint={null} className='w-full h-full !p-1'>
      <Subheader>
        <SubheaderLeft>
          <MiembrosGimnasioButtons activeTab={activeTabs} setActiveTab={setActiveTabs} />
        </SubheaderLeft>
      </Subheader>

      <div>
        {
          activeTabs.text === 'Información Personal'
            ? <InfoPersonal />
            : activeTabs.text === 'Historial Ejercicios'
              ? <HistorialEjercicios />
              : activeTabs.text === 'Historial Pagos'
                ? <HistorialPagos />
                : null
        }
      </div>
    </Container>
  )
}

export default DetalleCliente
