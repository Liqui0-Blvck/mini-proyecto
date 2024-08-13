
import React, { FC } from 'react'
import Label from '../../components/form/Label';
import Card, { CardBody } from '../../components/ui/Card';
import Radio, { RadioGroup } from '../../components/form/Radio';
import { useAppDispatch } from '../../store';
import useColorApp from '../../hooks/useColorApp';
import { setColorApp } from '../../store/slices/auth/userSlice';

interface PersonalizacionProps {
  formik: any
}

const Personalizacion: FC<PersonalizacionProps> = ({ formik }) => {
  const dispatch = useAppDispatch()
  const { colorApp, setColorAppTheme } = useColorApp()


  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value
    formik.setFieldValue('color', selectedColor);
    setColorAppTheme(selectedColor)
    dispatch(setColorApp(selectedColor));
  }


  return (
  <Card>
    <CardBody>
      <div>
        <div className='text-4xl font-semibold'>Apariencia</div>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12'>
            <Label htmlFor='theme'>Tema</Label>
            <RadioGroup isInline>
              <Radio
                name='theme'
                value='dark'
                selectedValue={formik.values.theme}
                onChange={formik.handleChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-950'>
                    <div className='h-full w-1/4 border-e border-zinc-800/50 bg-zinc-900' />
                    <div className='h-full w-3/4'>
                      <div className='h-4 w-full border-b border-zinc-800/50 bg-zinc-900' />
                      <div />
                      
                    </div>
                  </div>
                </div>
              </Radio>
              <Radio
                name='theme'
                value='light'
                selectedValue={formik.values.theme}
                onChange={formik.handleChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-100'>
                    <div className='h-full w-1/4 border-e border-emerald-500/25 bg-white' />
                    <div className='h-full w-3/4'>
                      <div className='h-4 w-full border-b border-zinc-300/25 bg-white' />
                      <div />
                    </div>
                  </div>
                </div>
              </Radio>
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <div className='text-4xl font-semibold'>Colores</div>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12'>
            <Label htmlFor='color'>Colores</Label>
            <RadioGroup isInline>
              <Radio
                name='color'
                value='cyan'
                selectedValue={formik.values.color}
                onChange={handleColorChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-950'>
                    <div className='h-full w-1/4 border-e border-zinc-800/50 bg-cyan-900' />
                    <div className='h-full w-3/4 relative'>
                      <div className='h-4 w-full border-b border-zinc-800/50 bg-cyan-900' />
                      <div />
                      <div className='absolute w-15 bottom-3 right-7 bg-cyan-900 px-2 rounded-md'>
                        <span className='text-xl text-white'>Cian</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Radio>

              <Radio
                name='color'
                value='red'
                selectedValue={formik.values.color}
                onChange={handleColorChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-950'>
                    <div className='h-full w-1/4 border-e border-zinc-800/50 bg-red-800' />
                    <div className='h-full w-3/4 relative'>
                      <div className='h-4 w-full border-b border-zinc-800/50 bg-red-800' />
                      <div />
                      <div className='absolute w-15 bottom-3 right-7 bg-red-900 px-2 rounded-md'>
                        <span className='text-xl text-white'>Rojo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Radio>

              <Radio
                name='color'
                value='violet'
                selectedValue={formik.values.color}
                onChange={handleColorChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-800'>
                    <div className='h-full w-1/4 border-e border-zinc-800/50 bg-violet-800/60' />
                    <div className='h-full w-3/4 relative'>
                      <div className='h-4 w-full border-b border-zinc-800/50 bg-violet-800/60' />
                      <div />
                      <div className='absolute w-15 bottom-3 right-7 bg-violet-900 px-2 rounded-md'>
                        <span className='text-xl text-white'>Violeta</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Radio>

              <Radio
                name='color'
                value='amber'
                selectedValue={formik.values.color}
                onChange={handleColorChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-950'>
                    <div className='h-full w-1/4 border-e border-zinc-800/50 bg-amber-900' />
                    <div className='h-full w-3/4 relative'>
                      <div className='h-4 w-full border-b border-zinc-800/50 bg-amber-900' />
                      <div />
                      <div className='absolute w-15 bottom-3 right-7 bg-amber-900 px-2 rounded-md'>
                        <span className='text-xl text-white'>Ambar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Radio>

              <Radio
                name='color'
                value='emerald'
                selectedValue={formik.values.color}
                onChange={handleColorChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-950'>
                    <div className='h-full w-1/4 border-e border-zinc-500/50 bg-emerald-900' />
                    <div className='h-full w-3/4 relative'>
                      <div className='h-4 w-full border-b border-zinc-500/50 bg-emerald-900' />
                      <div />
                      <div className='absolute w-15 bottom-3 right-7 bg-emerald-900 px-2 rounded-md'>
                        <span className='text-xl text-white'>Esmeralda</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Radio>
              
            </RadioGroup>
          </div>
        </div>
      </div>
    </CardBody>
  </Card>
  )
}

export default Personalizacion
