import React, { useEffect, useState } from 'react'
import MiembrosGimnasioButtons, { TAB_MIEMBROS_GYM, TTabMiembros } from './MiembrosGimnasioButtons'
import Container from '../../../components/layouts/Container/Container'
import Card, { CardBody } from '../../../components/ui/Card'
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store'
import { obtener_miembro } from '../../../store/slices/miembros/miembrosPeticiones'
import { RootState } from '../../../store/rootReducer'
import InfoPersonal from './InfoPersonal.component'


const DetalleCliente = () => {
  const [activeTabs, setActiveTabs] = useState<TTabMiembros>(TAB_MIEMBROS_GYM.INFO_PERSONAL)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state: RootState) => state.auth.session)
  const { miembro } = useAppSelector((state: RootState) => state.miembro.miembro)

  console.log(id)


  useEffect(() => {
    dispatch(obtener_miembro({ id, token }))
  }, [])

  console.log(miembro)


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
            : null
        }
      </div>
    </Container>
  )
}

export default DetalleCliente
