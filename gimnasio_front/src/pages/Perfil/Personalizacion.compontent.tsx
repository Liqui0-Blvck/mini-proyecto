
import React, { FC, useState } from 'react'
import Label from '../../components/form/Label';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import Input from '../../components/form/Input';
import Card, { CardBody, CardFooter, CardFooterChild, CardHeader, CardTitle } from '../../components/ui/Card';
import dayjs from 'dayjs';
import Button from '../../components/ui/Button';
import useSaveBtn from '../../hooks/useSaveBtn';
import Radio, { RadioGroup } from '../../components/form/Radio';
import { useFormik } from 'formik';

const Personalizacion = () => {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      theme: configuracion ? configuracion.estilo_aplicacion : 'dark',
			color: configuracion ? configuracion.color_aplicacion : 'zinc',
    },
    onSubmit: () => {

    }
  })

  return (
  <Card>
    <CardBody>
      <div className='border border-black p-2'>
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
                    <div className='h-full w-1/4 border-e border-zinc-800/50 bg-zinc-900/75' />
                    <div className='h-full w-3/4'>
                      <div className='h-4 w-full border-b border-zinc-800/50 bg-zinc-900/75' />
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

      <div className='border border-black p-2 mt-5'>
        <div className='text-4xl font-semibold'>Colores</div>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12'>
            <Label htmlFor='color'>Colores</Label>
            <RadioGroup isInline>
              <Radio
                name='color'
                value='cyan'
                selectedValue={formik.values.color}
                onChange={formik.handleChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-950'>
                    <div className='h-full w-1/4 border-e border-zinc-800/50 bg-cyan-900/75' />
                    <div className='h-full w-3/4'>
                      <div className='h-4 w-full border-b border-zinc-800/50 bg-cyan-900/75' />
                      <div />
                    </div>
                  </div>
                </div>
              </Radio>

              <Radio
                name='color'
                value='red'
                selectedValue={formik.values.color}
                onChange={formik.handleChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-950'>
                    <div className='h-full w-1/4 border-e border-zinc-800/50 bg-red-800/75' />
                    <div className='h-full w-3/4'>
                      <div className='h-4 w-full border-b border-zinc-800/50 bg-red-800/75' />
                      <div />
                    </div>
                  </div>
                </div>
              </Radio>

              <Radio
                name='color'
                value='violet'
                selectedValue={formik.values.color}
                onChange={formik.handleChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-800'>
                    <div className='h-full w-1/4 border-e border-zinc-800/50 bg-violet-800/60' />
                    <div className='h-full w-3/4'>
                      <div className='h-4 w-full border-b border-zinc-800/50 bg-violet-800/60' />
                      <div />
                    </div>
                  </div>
                </div>
              </Radio>

              <Radio
                name='color'
                value='amber'
                selectedValue={formik.values.color}
                onChange={formik.handleChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-950'>
                    <div className='h-full w-1/4 border-e border-zinc-800/50 bg-amber-900/75' />
                    <div className='h-full w-3/4'>
                      <div className='h-4 w-full border-b border-zinc-800/50 bg-amber-900/75' />
                      <div />
                    </div>
                  </div>
                </div>
              </Radio>

              <Radio
                name='color'
                value='emerald'
                selectedValue={formik.values.color}
                onChange={formik.handleChange}>
                <div className='relative'>
                  <div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
                    <div className='h-1 w-1 rounded-full bg-red-500' />
                    <div className='h-1 w-1 rounded-full bg-amber-500' />
                    <div className='h-1 w-1 rounded-full bg-emerald-500' />
                  </div>
                  <div className='flex aspect-video w-56 bg-zinc-950'>
                    <div className='h-full w-1/4 border-e border-zinc-500/50 bg-emerald-900/75' />
                    <div className='h-full w-3/4'>
                      <div className='h-4 w-full border-b border-zinc-500/50 bg-emerald-900/75' />
                      <div />
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
