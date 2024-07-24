import React, { FC, useState } from 'react'
import Avatar from '../../components/Avatar';
import Label from '../../components/form/Label';
import Input from '../../components/form/Input';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import Radio, { RadioGroup } from '../../components/form/Radio';
import RichText from '../../components/RichText';
import { useAppSelector } from '../../store';
import { RootState } from '../../store/rootReducer';
import { useFormik } from 'formik';
import Card, { CardBody, CardFooter, CardFooterChild, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import useSaveBtn from '../../hooks/useSaveBtn';


const Perfil = () => {
	const { perfil } = useAppSelector((state: RootState) => state.auth.user)
	const token = useAppSelector((state: RootState) => state.auth.session)
	const [isSaving, setIsSaving] = useState<boolean>(false);



  const formik = useFormik({
    initialValues: {
      image_perfil: '',
      first_name_: '',
      second_name: '',
      father_last_name: '',
      mother_last_name: '',
      fecha_nacimiento: '',
      direccion: '',
      genero: '',
      bio: '',
      numero_telefono: '',
      position: '',
			role: '',
    },
    onSubmit: (values: any) => {
      const formData = new FormData();
			
      formData.append('perfil_data[fecha_nacimiento]', values.fecha_nacimiento);
      formData.append('perfil_data[genero]', String(values.gender).toLowerCase());
      formData.append('perfil_data[direccion]', values.direccion);
      formData.append('perfil_data[numero_telefono]', values.numero_telefono);
    
      // Añadir imagen si existe y es un archivo
      if (values.fileUpload instanceof File) {
        formData.append('perfil_data[imagen_perfil]', values.fileUpload);
      }
    
      formData.append('usuario_data[first_name]', values.firstName);
      formData.append('usuario_data[second_name]', values.secondName);
      formData.append('usuario_data[father_last_name]', values.lastName);
      formData.append('usuario_data[mother_last_name]', values.secondLastName);
    
      //@ts-ignore
      dispatch(actualizar_perfil({
        id: perfil?.usuario.id,
        data: formData,
        token
      }));
    }
  })

  const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
		isNewItem: false,
		isSaving,
		isDirty: formik.dirty,
	});
 
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
              src={perfil?.imagen_perfil}
              className='!w-24'
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              name={`${perfil?.usuario.first_name} ${perfil?.usuario.father_last_name}`}
            />
          </div>
          <div className='flex grow items-center'>
            <div>
              <div className='w-full'>
                <Label
                  htmlFor='fileUpload'
                  className=''
                  description='At least 800x800 px recommended. JPG or PNG and GIF is allowed'>
                  Upload new image
                </Label>
                <Input
                  id='fileUpload'
                  name='fileUpload'
                  type='file'
                  onChange={formik.handleChange}
                  value={formik.values.fileUpload}
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

          <div className='col-span-12 lg:col-span-6'>
            <Label htmlFor='gender'>Gender</Label>
            <RadioGroup isInline>
              {['Masculino', 'Femenino', 'Otro'].map((i) => (
                <Radio
                  key={i}
                  label={i}
                  name='gender'
                  value={i}
                  selectedValue={formik.values.gender}
                  onChange={(e: any) => {
                    formik.setFieldValue('gender', e.target.value)
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
          <div className='col-span-12'>
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
          </div>
          <div className='col-span-12'>
            <Label htmlFor='bio'>Bio</Label>
            <RichText
              id='bio'
              value={formik.values.bio}
              handleChange={(event) => {
                formik
                  .setFieldValue('bio', event)
                  .then(() => {})
                  .catch(() => {});
              }}
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

   
  </>
  )
}

export default Perfil
