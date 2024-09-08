import { monthDays } from '@formkit/tempo'
import { useFormik } from 'formik'
import { first } from 'lodash'
import Card, { CardBody, CardFooter } from '../../components/ui/Card';
import Container from '../../components/layouts/Container/Container';
import Label from '../../components/form/Label';
import Validation from '../../components/form/Validation';
import FieldWrap from '../../components/form/FieldWrap';
import Input from '../../components/form/Input';
import Button from '../../components/ui/Button';
import { MdDataSaverOn } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../store';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RootState } from '../../store/rootReducer';
import { registrar_miembros } from '../../store/slices/miembros/miembrosPeticiones';
import { IoMdSave } from 'react-icons/io';
import { obtener_gimnasio } from '../../store/slices/gimnasio/gimnasioPeticiones';
import { obtener_sucursal } from '../../store/slices/surcursal/sucursalPeticiones';
import Radio, { RadioGroup } from '../../components/form/Radio';
import { miembroValidatorSchema } from '../../utils/validationForm.utils';

interface IFormikMiembro {
  email: string;
  first_name: string;
  second_name: string;
  father_last_name: string;
  mother_last_name: string;
  fecha_nacimiento: string;
  genero: string;
  direccion: string;
  numero_telefono: string
  // preferencia_entrenamiento: Record<string, string>;
  // objetivo_personales: Record<string, string>;
}

const FormularioMiembro = ({ setOpen } : { setOpen: Dispatch<SetStateAction<boolean>>}  ) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const token = useAppSelector((state: RootState) => state.auth.session)
  const { perfil } = useAppSelector((state: RootState) => state.auth.user)
  const { gimnasio } = useAppSelector((state: RootState) => state.gimnasio.gimnasio)
  const { sucursal } = useAppSelector((state: RootState) => state.sucursal.sucursal)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (gimnasio === null) {
      dispatch(obtener_gimnasio({ id: perfil?.usuario.id, token }))
    }
  }, [])

  useEffect(() => {
    dispatch(obtener_sucursal({ id: gimnasio?.id, token }))
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      second_name: '',
      father_last_name: '',
      mother_last_name: '',
      fecha_nacimiento: '',
      genero: '',
      direccion: '',
      numero_telefono: '',
    },
    validationSchema: miembroValidatorSchema,
    onSubmit: (values: IFormikMiembro) => {
      setIsSaving(true)
      dispatch(
        registrar_miembros({
          data: {
            usuario_data: {
              email: values.email,
              first_name: values.first_name,
              second_name: values.second_name,
              father_last_name: values.father_last_name,
              mother_last_name: values.mother_last_name,
              gimnasio: gimnasio?.id,
              sucursal: sucursal?.id
            },
            miembro_data: {
              fecha_nacimiento: values.fecha_nacimiento,
              genero: values.genero,
              direccion: values.direccion,
              numero_telefono: values.numero_telefono
            }
          },
          token
        })
      ).then(() => {
        setIsSaving(false)
        setOpen(false)
      })

    }
  })

  
  return (
    <Container breakpoint={null} className='w-full h-full !p-0'>
      <Card>
        <CardBody>
          <div className='grid grid-cols-12 gap-4'>
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
              <Validation
                isValid={formik.isValid}
                isTouched={formik.touched.second_name}
                invalidFeedback={formik.errors.second_name}
                >
                <FieldWrap>
                  <Input
                    id='second_name'
                    name='second_name'
                    onChange={formik.handleChange}
                    value={formik.values.second_name}
                    autoComplete='given-name'
                    autoCapitalize='words'
                  />
                </FieldWrap>
              </Validation>
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
                    autoComplete='given-name'
                    autoCapitalize='words'
                  />
                </FieldWrap>
              </Validation>
            </div>


            <div className='col-span-12 lg:col-span-6'>
              <Label htmlFor='mother_last_name'>Apellido Materno</Label>
              <Validation
                isValid={formik.isValid}
                isTouched={formik.touched.mother_last_name}
                invalidFeedback={formik.errors.mother_last_name}
                >
                <FieldWrap>
                  <Input
                    id='mother_last_name'
                    name='mother_last_name'
                    onChange={formik.handleChange}
                    value={formik.values.mother_last_name}
                    autoComplete='given-name'
                    autoCapitalize='words'
                  />
                </FieldWrap>
              </Validation>
            </div>

            <div className='col-span-12 lg:col-span-6'>
              <Label htmlFor='fecha_nacimiento'>Fecha Nacimiento</Label>
              <Validation
                isValid={formik.isValid}
                isTouched={formik.touched.fecha_nacimiento}
                invalidFeedback={formik.errors.fecha_nacimiento}
                >
                <FieldWrap>
                  <Input
                    type='date'
                    id='fecha_nacimiento'
                    name='fecha_nacimiento'
                    onChange={formik.handleChange}
                    value={formik.values.fecha_nacimiento}
                  />
                </FieldWrap>
              </Validation>
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
              <Label htmlFor='numero_telefono'>Número Telefono</Label>
              <Validation
                isValid={formik.isValid}
                isTouched={formik.touched.numero_telefono}
                invalidFeedback={formik.errors.numero_telefono}
                >
                <FieldWrap>
                  <Input
                    id='numero_telefono'
                    name='numero_telefono'
                    onChange={formik.handleChange}
                    value={formik.values.numero_telefono}
                  />
                </FieldWrap>
              </Validation>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <div>
            <Button
              aria-details='Registrar Cliente'
              icon={isSaving ? <MdDataSaverOn className='mr-3 text-2xl animate-spin'/> : <IoMdSave className='mr-3 text-2xl'/>}
              variant='solid'
              colorIntensity={isSaving ? '400' : '600'}
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

export default FormularioMiembro
