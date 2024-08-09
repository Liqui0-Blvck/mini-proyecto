import { useFormik } from 'formik'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Container from '../../components/layouts/Container/Container'
import Card, { CardBody, CardFooter } from '../../components/ui/Card'
import Label from '../../components/form/Label'
import FieldWrap from '../../components/form/FieldWrap'
import Input from '../../components/form/Input'
import Validation from '../../components/form/Validation'
import { IGimnasioFormikValues } from './Gimnasio.component'
import Button from '../../components/ui/Button'
import { MdDataSaverOn } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../../store'
import { registrar_gimnasio } from '../../store/slices/gimnasio/gimnasioPeticiones'
import { RootState } from '../../store/rootReducer'
import Avatar from '../../components/Avatar'

const FormularioGimnasio = ({ setClose } : { setClose : Dispatch<SetStateAction<boolean>>}) => {
	const [isSaving, setIsSaving] = useState<boolean>(false)
  const token = useAppSelector((state: RootState) => state.auth.session)
  const { gimnasio } = useAppSelector((state: RootState) => state.gimnasio.gimnasio)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      nombre: '',
      direccion: '',
      ciudad: '',
      estado: '',
      telefono: '',
      logo: '',
      email: '',
      sitio_web: ''
    },
    onSubmit: (values: IGimnasioFormikValues) => {
      setIsSaving(true)
      dispatch(
        registrar_gimnasio({
          data: {
            ...values,
            logo: values.logo instanceof File ? values.logo : undefined,
            dueno: gimnasio?.dueno
          },   
          token
        })
      )
      setTimeout(() => {
        setClose(false)
        setIsSaving(false)
      }, 1200)
    }
  })



  return (
    <Container breakpoint={null} className='w-full h-full !p-0'>
      <Card>
        <CardBody>
          <div className='flex flex-col-reverse md:flex-row lg:flex-row justify-between gap-5'>
            <div className='md:w-8/12 lg:w-8/12 grid grid-cols-12 gap-4'>
              <div className='col-span-12 lg:col-span-6'>
                <Label htmlFor='email'>Email</Label>
                
                <Validation
                  isValid={formik.isValid}
                  isTouched={formik.touched.email}
                  invalidFeedback={formik.errors.email}
                  >
                  <FieldWrap>
                    <Input
                      id='email'
                      name='email'
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      autoComplete='given-name'
                      autoCapitalize='words'
                    />
                  </FieldWrap>
                </Validation>
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
                <Validation
                  isValid={formik.isValid}
                  isTouched={formik.touched.direccion}
                  invalidFeedback={formik.errors.direccion}
                  >
                  <FieldWrap>
                    <Input
                      id='direccion'
                      name='direccion'
                      onChange={formik.handleChange}
                      value={formik.values.direccion}
                      autoComplete='given-name'
                      autoCapitalize='words'
                    />
                  </FieldWrap>
                </Validation>
              </div>

              <div className='col-span-12 lg:col-span-6'>
                <Label htmlFor='telefono'>Teléfono</Label>
                <Validation
                  isValid={formik.isValid}
                  isTouched={formik.touched.telefono}
                  invalidFeedback={formik.errors.telefono}
                  >
                  <FieldWrap>
                    <Input
                      id='telefono'
                      name='telefono'
                      onChange={formik.handleChange}
                      value={formik.values.telefono}
                      autoComplete='given-name'
                      autoCapitalize='words'
                    />
                  </FieldWrap>
                </Validation>
              </div>
            </div>

            <div className='w-4/12'>
              <Label htmlFor='logo'>Agrega un Logo</Label>
              <div className='relative'>
                  <div className='md:absolute lg:absolute sm:left-4 lg:top-2'>
                    <label htmlFor='logo' className='cursor-pointer'>
                      <Avatar
                        rounded='rounded'
                        src={
                          formik.values.logo instanceof File
                            ? URL.createObjectURL(formik.values.logo)
                            : `${gimnasio?.logo ? gimnasio.logo : '/src/assets/avatar/no-image-account.avif'}`
                        }
                        className='!w-48 lg:!w-28'
                      />
                    </label>
                  </div>
                  <div className='hidden'>
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
                          className='hidden' // Ocultar el input
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
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <div className='flex w-full items-center justify-end'>
            <Button
              aria-details='Guardar Gimnasio'
              icon={isSaving ? <MdDataSaverOn className='mr-3 text-2xl animate-spin'/> : <IoMdSave className='mr-3 text-2xl'/>}
              variant='solid'
              color={isSaving ? 'indigo' : 'blue'}
              isDisable={isSaving}
              onClick={() => formik.handleSubmit()}>
              {isSaving ? 'Guardando' : 'Guardar'}
            </Button> 
          </div>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default FormularioGimnasio
