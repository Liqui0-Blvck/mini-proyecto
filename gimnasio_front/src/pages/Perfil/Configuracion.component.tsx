import React, { FC, useState } from 'react'
import Label from '../../components/form/Label';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import Input from '../../components/form/Input';
import { FormikProps, useFormik } from 'formik';
import { useAppSelector } from '../../store';
import { RootState } from '../../store/rootReducer';
import Card, { CardBody, CardFooter, CardFooterChild, CardHeader, CardTitle } from '../../components/ui/Card';
import dayjs from 'dayjs';
import Button from '../../components/ui/Button';
import useSaveBtn from '../../hooks/useSaveBtn';


const Configuracion = () => {
  const { configuracion } = useAppSelector((state: RootState) => state.auth.user)
	const [isSaving, setIsSaving] = useState<boolean>(false);


  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
			configuraciones_notificaciones: true,
			configuraciones_privacidad: true,
			fuente_aplicacion: ''
    },
    onSubmit: () => {

    }
  })

  const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
		isNewItem: false,
		isSaving,
		isDirty: formik.dirty,
	});


  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración</CardTitle>
      </CardHeader>
      <CardBody>
          <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='email'>Email</Label>
            <FieldWrap
              firstSuffix={
                <Icon
                  icon='HeroEnvelope'
                  className='mx-2'
                />
              }>
              <Input
                id='email'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                autoComplete='email'
              />
            </FieldWrap>
          </div>
          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='firstName'>Nombre</Label>
            <Input
              id='firstName'
              name='firstName'
              onChange={formik.handleChange}
              value={formik.values.firstName}
              autoComplete='given-name'
              autoCapitalize='words'
            />
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='secondName'>Segundo Nombre</Label>
            <Input
              id='secondName'
              name='secondName'
              onChange={formik.handleChange}
              value={formik.values.secondName}
              autoComplete='given-name'
              autoCapitalize='words'
            />
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='lastName'>Apellido Paterno</Label>
            <Input
              id='lastName'
              name='lastName'
              onChange={formik.handleChange}
              value={formik.values.lastName}
              autoComplete='family-name'
              autoCapitalize='words'
            />
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='secondLastName'>Apellido Materno</Label>
            <Input
              type='text'
              id='secondLastName'
              name='secondLastName'
              onChange={formik.handleChange}
              value={formik.values.secondLastName}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <CardFooterChild>
          <div className='flex items-center gap-2'>
            <Icon icon='HeroDocumentCheck' size='text-2xl' />
            <span className='text-zinc-500'>Last saved:</span>
            <b>{dayjs().locale(i18n.language).format('LLL')}</b>
          </div>
        </CardFooterChild>
        <CardFooterChild>
          <Button
            icon='HeroServer'
            variant='solid'
            color={saveBtnColor}
            isDisable={saveBtnDisable}
            onClick={() => formik.handleSubmit()}>
            {saveBtnText}
          </Button>
        </CardFooterChild>
      </CardFooter>
    </Card>
  )
}

export default Configuracion
