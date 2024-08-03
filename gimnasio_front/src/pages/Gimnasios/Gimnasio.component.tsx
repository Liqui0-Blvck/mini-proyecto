import React, { useEffect, useState } from 'react'
import Avatar from '../../components/Avatar';
import Label from '../../components/form/Label';
import Input from '../../components/form/Input';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store/rootReducer';
import { useFormik } from 'formik';
import Card, { CardBody, CardFooter, CardFooterChild, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import useSaveBtn from '../../hooks/useSaveBtn';
import Validation from '../../components/form/Validation';
import { format } from '@formkit/tempo'
import { obtener_gimnasio } from '../../store/slices/gimnasio/gimnasioPeticiones';

interface IGimnasioFormikValues {
  nombre: string;
  direccion: string;
  ciudad: string;
  estado: string;
  telefono: string;
  logo: string | File;
  email: string;
  sitio_web: string;
}

const GimnasioComponent = () => {
  const token = useAppSelector((state: RootState) => state.auth.session)
  const { perfil } = useAppSelector((state: RootState) => state.auth.user)
  const dispatch = useAppDispatch()
	const [isSaving, setIsSaving] = useState<boolean>(false)

  const { gimnasio } = useAppSelector((state: RootState) => state.gimnasio.gimnasio)

  useEffect(() => {
    dispatch(obtener_gimnasio({ id: perfil?.usuario.id, token}))
  }, [])

  console.log(gimnasio)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nombre: gimnasio?.nombre!,
      direccion: gimnasio?.direccion!,
      ciudad: gimnasio?.ciudad!,
      estado: gimnasio?.estado!,
      telefono: gimnasio?.telefono!,
      logo: gimnasio?.logo!,
      email: gimnasio?.email!,
      sitio_web: gimnasio?.sitio_web!
    },
    onSubmit: (values: IGimnasioFormikValues) => {
      
    }
  })

  const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
		isNewItem: false,
		isSaving,
		isDirty: formik.dirty,
	})



  return (
    <>
    <Card>
      <CardBody>
        <div className='flex w-full gap-4'>
          <div className='flex-shrink-0 mb-10'>
            <Avatar
              rounded='rounded'
              src={
                formik.values.logo instanceof File
                  ? URL.createObjectURL(formik.values.logo)
                  : `${gimnasio?.logo ? gimnasio.logo : '/src/assets/avatar/no-image-account.avif'}`
              }
              className='!w-32'
            />
          </div>
          <div className='flex grow items-center'>
            <div>
              <div className='w-full'>
                <Label
                  htmlFor='logo'
                  className=''
                  description='At least 800x800 px recommended. JPG or PNG and GIF is allowed'>
                  Sube una imagen
                </Label>
                <Input
                  id='logo'
                  name='logo'
                  type='file'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.currentTarget.files?.[0];
                        if (file) {
                          formik.setFieldValue('logo', file);
                        }
                  
                  }}
                />
              </div>
            </div>
          </div>
        </div>
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
                value={formik.values.email}
                autoComplete='email'
              />
            </FieldWrap>
          </div>
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
            <Label htmlFor='ciudad'>Ciudad</Label>
            <Validation
              isValid={formik.isValid}
              isTouched={formik.touched.ciudad}
              invalidFeedback={formik.errors.ciudad}
              >
              <FieldWrap>
                <Input
                  id='ciudad'
                  name='ciudad'
                  onChange={formik.handleChange}
                  value={formik.values.ciudad}
                  autoComplete='family-name'
                  autoCapitalize='words'
                />
              </FieldWrap>
            </Validation>
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
            <Label htmlFor='sitio_web'>Sitio Web </Label>
            <Input
              type='date'
              id='sitio_web'
              name='sitio_web'
              onChange={formik.handleChange}
              value={formik.values.sitio_web}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter>
      <CardFooterChild>
        <div className='flex items-center gap-2'>
          <Icon icon='HeroDocumentCheck' size='text-2xl' />
          <span className='text-zinc-500'>Ultimo Guardado:</span>
          <b>{format(gimnasio?.fecha_modificacion!, { date: 'full', time: 'full' }, 'es' )}</b>
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

   
  </>
  )
}

export default GimnasioComponent