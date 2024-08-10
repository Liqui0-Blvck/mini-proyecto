import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { obtener_sucursales } from '../../../store/slices/surcursal/sucursalPeticiones'
import Card, { CardBody } from '../../../components/ui/Card'
import { useFormik } from 'formik'
import Label from '../../../components/form/Label'
import FieldWrap from '../../../components/form/FieldWrap'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/form/Input'
import Validation from '../../../components/form/Validation'

interface IFormValues {
  nombre: string
  direccion: string
  telefono: string
  horario_apertura: string
  horario_cierre: string
}

const Sucursal = () => {
  const { gimnasio } = useAppSelector((state) => state.gimnasio.gimnasio)
  const { sucursales, sucursal } = useAppSelector((state) => state.sucursal.sucursal)
  const token = useAppSelector((state) => state.auth.session)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (gimnasio) {
      dispatch(obtener_sucursales({ id: gimnasio.id, token: token }))
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      nombre: sucursal?.nombre! || '',
      direccion: sucursal?.direccion! || '',
      telefono: sucursal?.telefono! || '',
      horario_apertura: sucursal?.horario_apertura! || '',
      horario_cierre: sucursal?.horario_cierre! || ''
    }, 
    onSubmit: (values: IFormValues) => {
      console.log(values)
    }
  })
    
  return (
    <Card>
      <CardBody>
        {
          sucursales?.length! <= 1 
            ? (
              <div className='flex items-center justify-center'>
                <h1>No hay sucursales</h1>
              </div>
            )
            : (
              <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-12 lg:col-span-6'>
                  <Label htmlFor='nombre'>Nombre</Label>
                  <Validation
                    isValid={formik.isValid}
                    isTouched={formik.touched.nombre}
                    invalidFeedback={formik.errors.nombre}
                    >
                    <FieldWrap>
                      <Input
                        id='nombre'
                        name='nombre'
                        onChange={formik.handleChange}
                        value={formik.values.nombre}
                        autoComplete='given-name'
                        autoCapitalize='words'
                      />
                    </FieldWrap>
                  </Validation>
                  

                </div>

                <div className='col-span-12 lg:col-span-6'>
                  <Label htmlFor='direccion'>Dirección</Label>
                  <Input
                    id='direccion'
                    name='direccion'
                    onChange={formik.handleChange}
                    value={formik.values.direccion}
                    autoComplete='given-name'
                    autoCapitalize='words'
                  />
                </div>

                <div className='col-span-12 lg:col-span-6'>
                  <Label htmlFor='telefono'>Telefono</Label>
                  <Input
                    type='text'
                    id='telefono'
                    name='telefono'
                    onChange={formik.handleChange}
                    value={formik.values.telefono}
                  />
                </div>

                <div className='col-span-12 lg:col-span-6'>
                  <Label htmlFor='horario_apertura'>Horario Apertura </Label>
                  <Input
                    type='date'
                    id='horario_apertura'
                    name='horario_apertura'
                    onChange={formik.handleChange}
                    value={formik.values.horario_apertura}
                  />
                </div>

                <div className='col-span-12 lg:col-span-6'>
                  <Label htmlFor='horario_cierre'>Horario Cierre </Label>
                  <Input
                    type='date'
                    id='horario_cierre'
                    name='horario_cierre'
                    onChange={formik.handleChange}
                    value={formik.values.horario_cierre}
                  />
                </div>
              </div>
            )
        }
      </CardBody>
    </Card>
  )
}

export default Sucursal