import React, { FC, useEffect, useState } from 'react'
import Avatar from '../../components/Avatar';
import Label from '../../components/form/Label';
import Input from '../../components/form/Input';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import Radio, { RadioGroup } from '../../components/form/Radio';
import RichText from '../../components/RichText';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store/rootReducer';
import { useFormik } from 'formik';
import Card, { CardBody, CardFooter, CardFooterChild, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import useSaveBtn from '../../hooks/useSaveBtn';
import { useTranslation } from 'react-i18next';
import { actualizar_imagen, actualizar_perfil } from '../../store/slices/auth/authSlices';
import { PerfilSchema } from '../../utils/validationForm.utils';
import { capitalizeFirstLetter } from '../../utils/getCapitalize';
import Validation from '../../components/form/Validation';
import { format } from '@formkit/tempo'


interface initialValues {
  imagen_perfil: string | File 
  first_name: string
  second_name: string
  father_last_name: string
  mother_last_name: string
  fecha_nacimiento: string
  direccion: string
  genero: string
  numero_telefono: string
}

const Perfil = () => {

	const { perfil } = useAppSelector((state: RootState) => state.auth.user)
	const token = useAppSelector((state: RootState) => state.auth.session)
  const dispatch = useAppDispatch()
	const [isSaving, setIsSaving] = useState<boolean>(false);



  const formik = useFormik({
    initialValues: {
      imagen_perfil: perfil?.imagen_perfil! || '',
      first_name:  perfil?.usuario.first_name!,
      second_name:  perfil?.usuario.second_name!,
      father_last_name:  perfil?.usuario.father_last_name!,
      mother_last_name:  perfil?.usuario.mother_last_name!,
      fecha_nacimiento:  perfil?.fecha_nacimiento!,
      direccion:  perfil?.direccion!,
      //@ts-ignore
      genero:  capitalizeFirstLetter(perfil?.genero!),
      numero_telefono:  perfil?.numero_telefono!,
    },
    validationSchema: PerfilSchema,
    onSubmit: (values: initialValues) => {
      setIsSaving(true)

      dispatch(actualizar_perfil({
        id: perfil?.usuario.id,
        data: {
          perfil_data: {
            fecha_nacimiento: values.fecha_nacimiento,
            genero: String(values.genero).toLowerCase(),
            direccion: values.direccion,
            numero_telefono: values.numero_telefono
          },
          usuario_data: {
            first_name: values.first_name,
            second_name: values.second_name,
            father_last_name: values.father_last_name,
            mother_last_name: values.mother_last_name
          }
        },
        token
      }));

      if (values.imagen_perfil instanceof File){
        dispatch(actualizar_imagen({
          id: perfil?.id,
          data: { imagen_perfil: values.imagen_perfil},
          token
        }))
      }

      setTimeout(() => {
        setIsSaving(false)
      }, 1200)
      
    }
  })

  console.log(formik.values.imagen_perfil)


  const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
		isNewItem: false,
		isSaving,
		isDirty: formik.dirty,
	})

 
  return (
  <>
    <Card>
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
      </CardHeader>
      <CardBody>
        <div className='flex w-full gap-4'>
          <div className='flex-shrink-0'>
            <Avatar
              src={
                formik.values.imagen_perfil instanceof File
                  ? URL.createObjectURL(formik.values.imagen_perfil)
                    //@ts-ignore
                  : `${!formik.values.imagen_perfil.includes(import.meta.env.VITE_URL_DEV) ? `${import.meta.env.VITE_URL_DEV}${formik.values.imagen_perfil}` : formik.values.imagen_perfil}`
              }
              className='!w-32'
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              name={`${perfil?.usuario.first_name} ${perfil?.usuario.father_last_name}`}
            />
          </div>
          <div className='flex grow items-center'>
            <div>
              <div className='w-full'>
                <Label
                  htmlFor='image_perfil'
                  className=''
                  description='At least 800x800 px recommended. JPG or PNG and GIF is allowed'>
                  Sube una imagen
                </Label>
                <Input
                  id='image_perfil'
                  name='image_perfil'
                  type='file'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.currentTarget.files?.[0];
                        if (file) {
                          formik.setFieldValue('imagen_perfil', file);
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
                value={perfil?.usuario.email}
                autoComplete='email'
              />
            </FieldWrap>
          </div>
          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='first_name'>Nombre</Label>
            <Validation
              isValid={formik.isValid}
              isTouched={formik.touched.first_name}
              invalidFeedback={formik.errors.first_name}
              >
              <FieldWrap>
                <Input
                  id='first_name'
                  name='first_name'
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                  autoComplete='given-name'
                  autoCapitalize='words'
                />
              </FieldWrap>
            </Validation>
            

          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='second_name'>Segundo Nombre</Label>
            <Input
              id='second_name'
              name='second_name'
              onChange={formik.handleChange}
              value={formik.values.second_name}
              autoComplete='given-name'
              autoCapitalize='words'
            />
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='father_last_name'>Apellido Paterno</Label>
            <Validation
              isValid={formik.isValid}
              isTouched={formik.touched.father_last_name}
              invalidFeedback={formik.errors.father_last_name}
              >
              <FieldWrap>
                <Input
                  id='father_last_name'
                  name='father_last_name'
                  onChange={formik.handleChange}
                  value={formik.values.father_last_name}
                  autoComplete='family-name'
                  autoCapitalize='words'
                />
              </FieldWrap>
            </Validation>
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='mother_last_name'>Apellido Materno</Label>
            <Input
              type='text'
              id='mother_last_name'
              name='mother_last_name'
              onChange={formik.handleChange}
              value={formik.values.mother_last_name}
            />
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='genero'>Género</Label>
            <RadioGroup isInline>
              {['Masculino', 'Femenino', 'Otro'].map((i) => (
                <Radio
                  key={i}
                  label={i}
                  name='genero'
                  value={i}
                  selectedValue={formik.values.genero}
                  onChange={(e: any) => {
                    formik.setFieldValue('genero', e.target.value)
                  }}
                />
              ))}
            </RadioGroup>
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='fecha_nacimiento'>Fecha Nacimiento </Label>
            <Input
              type='date'
              id='fecha_nacimiento'
              name='fecha_nacimiento'
              onChange={formik.handleChange}
              value={formik.values.fecha_nacimiento}
            />
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='direccion'>Dirección </Label>
            <FieldWrap
              firstSuffix={
                <Icon
                  icon='HeroMapPin'
                  className='mx-2'
                />
              }
            >
              <Input
                type='text'
                id='direccion'
                name='direccion'
                onChange={formik.handleChange}
                value={formik.values.direccion}
              />
            </FieldWrap>
          </div>

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='numero_telefono'>N° Telefono </Label>
            <FieldWrap
              firstSuffix={
                <Icon
                  icon='HeroPhone'
                  className='mx-2'
                />
              }
              >
              <Input
                type='text'
                id='numero_telefono'
                name='numero_telefono'
                onChange={formik.handleChange}
                value={formik.values.numero_telefono}
              />
            </FieldWrap>
          </div>

          {/* <div className='col-span-12'>
            <Label htmlFor='position'>Role</Label>
            <FieldWrap
              firstSuffix={
                <Icon
                  icon='HeroShieldCheck'
                  className='mx-2'
                />
              }
              lastSuffix={
                <Icon
                  icon='HeroChevronDown'
                  className='mx-2'
                />
              }>
              <Select
                name='role'
                onChange={formik.handleChange}
                value={formik.values.role}
                placeholder='Select role'>
                {rolesDb.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </FieldWrap>
          </div> */}
          {/* <div className='col-span-12'>
            <Label htmlFor='position'>Position</Label>

            <FieldWrap
              firstSuffix={
                <Icon
                  icon='HeroBriefcase'
                  className='mx-2'
                />
              }>
              <Input
                id='position'
                name='position'
                onChange={formik.handleChange}
                value={formik.values.position}
              />
            </FieldWrap>
          </div> */}
        </div>
      </CardBody>
      <CardFooter>
      <CardFooterChild>
        <div className='flex items-center gap-2'>
          <Icon icon='HeroDocumentCheck' size='text-2xl' />
          <span className='text-zinc-500'>Ultimo Guardado:</span>
          <b>{format(perfil?.fecha_modificacion!, { date: 'full', time: 'full' }, 'es' )}</b>
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

export default Perfil
