import React, { FC, useEffect, useState } from 'react'
import Label from '../../components/form/Label';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import Input from '../../components/form/Input';
import { FormikProps, useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store/rootReducer';
import Card, { CardBody, CardFooter, CardFooterChild, CardHeader, CardTitle } from '../../components/ui/Card';
import dayjs from 'dayjs';
import Button from '../../components/ui/Button';
import useSaveBtn from '../../hooks/useSaveBtn';
import { useTranslation } from 'react-i18next';
import Container from '../../components/layouts/Container/Container';
import Validation from '../../components/form/Validation';
import Checkbox from '../../components/form/Checkbox';
import { opcionesFuentes } from '../../constants/general.constant';
import SelectReact from '../../components/form/SelectReact';
import Personalizacion from './Personalizacion.compontent';
import useDarkMode from '../../hooks/useDarkMode';
import { TColors } from '../../types/colors.type';
import { TDarkMode } from '../../types/darkMode.type';
import { setColorApp } from '../../store/slices/auth/userSlice';
import { actualizar_configuracion } from '../../store/slices/auth/authSlices';

interface ConfiguracionFormikProps {
  configuraciones_notificaciones: boolean
  configuraciones_privacidad: boolean
  fuente_aplicacion: string
  theme: string
  color: string | TColors
}


const Configuracion = () => {
	const { i18n } = useTranslation();
  const { perfil } = useAppSelector((state: RootState) => state.auth.user)
  const { configuracion } = useAppSelector((state: RootState) => state.auth.user)
  const token = useAppSelector((state: RootState) => state.auth.session)
  const { colorApp } = useAppSelector((state: RootState) => state.auth.user)
	const { setDarkModeStatus } = useDarkMode();
  const dispatch = useAppDispatch()
  
	const [isSaving, setIsSaving] = useState<boolean>(false);
  const isNewItem = false;


  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
			configuraciones_notificaciones: configuracion?.configuraciones_notificaciones!,
			configuraciones_privacidad: configuracion?.configuraciones_privacidad!,
			fuente_aplicacion: configuracion?.fuente_aplicacion!,
      theme: configuracion?.estilo_aplicacion!,
			color: configuracion?.color_aplicacion!,
    },
    onSubmit: (values: ConfiguracionFormikProps) => {
      setIsSaving(true);
      dispatch(actualizar_configuracion({ 
        id: perfil?.id,
        data: 
          {
            color_aplicacion: colorApp ? colorApp : configuracion?.color_aplicacion,
            estilo_aplicacion: values.theme,
            fuente_aplicacion: values.fuente_aplicacion,
            configuraciones_notificaciones: values.configuraciones_notificaciones,
            configuraciones_privacidad: values.configuraciones_privacidad
          }, token }))
        
        setTimeout(() => {
          setIsSaving(false)
        }, 1200)

      }
      
  })

  const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
		isNewItem: false,
		isSaving,
		isDirty: formik.dirty,
	})


  useEffect(() => {
		setDarkModeStatus(formik.values.theme as TDarkMode);
	}, [formik.values.theme]);




  return (
    <Container breakpoint={null} className='w-full h-full flex flex-col justify-between'>
      <Card>
        <CardHeader>
          <CardTitle className='text-4xl'>Configuración</CardTitle>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-12 lg:col-span-6'>
              <Label htmlFor='configuraciones_notificaciones'>Notificaciones</Label>
              <Checkbox
                id='configuraciones_notificaciones'
                name='configuraciones_notificaciones'
                variant='switch'
                onChange={formik.handleChange}
                checked={formik.values.configuraciones_notificaciones}
                />
            </div>
            <div className='col-span-12 lg:col-span-6'>
              <Label htmlFor='configuraciones_privacidad'>Privacidad</Label>
              <Checkbox
                id='configuraciones_privacidad'
                name='configuraciones_privacidad'
                variant='switch'
                onChange={formik.handleChange}
                checked={formik.values.configuraciones_privacidad}
                />
            </div>

            <div className='col-span-12 lg:col-span-6'>
              <Label htmlFor='fuente_aplicacion'>Nombre</Label>
              <Validation
              isValid={formik.isValid}
              isTouched={formik.touched.fuente_aplicacion}
              invalidFeedback={formik.errors.fuente_aplicacion}
              >
              <FieldWrap>
                <SelectReact
                  options={opcionesFuentes}
                  id='fuente_aplicacion'
                  name='fuente_aplicacion'
                  placeholder='Selecciona una Fuente'
                  value={opcionesFuentes.find(fuente => fuente?.value === formik.values.fuente_aplicacion)}
                  onBlur={formik.handleBlur}
                  onChange={(value: any) => {
                    formik.setFieldValue('fuente_aplicacion', value.value)
                  }}
                />
              </FieldWrap>
            </Validation>
            </div>
          </div>

          <Personalizacion formik={formik}/>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <Icon icon='HeroDocumentCheck' size='text-2xl' />
            <span className='text-zinc-500'>Ultimo Guardado:</span>
            <b>{dayjs().locale(i18n.language).format('LLL')}</b>
          </div>

          <Button
            icon='HeroServer'
            variant='solid'
            color={saveBtnColor}
            isDisable={saveBtnDisable}
            onClick={() => formik.handleSubmit()}>
            {saveBtnText}
          </Button>
        </div>
  
        </CardBody>
      </Card>
    </Container>
  )
}

export default Configuracion
