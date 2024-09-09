import React, { FC, useEffect, useState } from 'react';
import {
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';

import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/icon/Icon';
import Input from '../../../../components/form/Input';
import TableTemplate, {
	TableCardFooterTemplate,
} from '../../../../templates/common/TableParts.template';
import Badge from '../../../../components/ui/Badge';

import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import FieldWrap from '../../../../components/form/FieldWrap';
import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import { IAsistencia, TMiembro } from '../../../../types/miembros/miembros.type';
import { format } from '@formkit/tempo';
import Modal, { ModalBody, ModalHeader } from '../../../../components/ui/Modal';
import { RootState } from '../../../../store/rootReducer'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { useParams } from 'react-router-dom'
import { TEjercicio } from '../../../../types/ejercicios/ejercicios.type';
import { historiaEjercicios } from '../../../../demos/Ejercicios.demo'
import { useTranslation } from 'react-i18next';
import { IoIosEye, IoIosEyeOff  } from "react-icons/io";

export interface IHistoriaEjercicios {
  ejercicios: TEjercicio
  fecha_creacion: string
  hora_entrada: string
  hora_salida: string
  duracion: string
}

const historial: IHistoriaEjercicios[] = []

interface TablaHistoricaEjercicioProps {
  onRowClick: (muscleGroup: string) => void;
  highlightedMuscle?: string;
}


const TablaHistoricaEjercicio: FC<TablaHistoricaEjercicioProps> = ({ onRowClick, highlightedMuscle }) => {
  const { t } = useTranslation('translation')
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('')
  const [exerciseSelected, setExerciseSelected] = useState<string | null>(null)

  const handleRowClick = (muscleGroup: string) => {
    onRowClick(muscleGroup);
  }

  const columnHelper = createColumnHelper<IHistoriaEjercicios>();

  const columns = [

    columnHelper.accessor('fecha_creacion', {
      cell: (info) => (
        <div>
          <span>{format(info.row.original.fecha_creacion, { date: 'medium' }, 'es' )}</span>
        </div>
      ),
      header: 'Día Asistido',
    }),
    columnHelper.accessor('ejercicios.nombre', {
      cell: (info) => (
        <div>
          <span>{info.row.original.ejercicios.nombre}</span>
        </div>
      ),
      header: 'Ejercicio Realizado',
    }),
    columnHelper.accessor('ejercicios.grupo_muscular', {
      cell: (info) => (
        <div>
          <span>{t(info.row.original.ejercicios.grupo_muscular!)}</span>
        </div>
      ),
      header: 'Grupo Muscular',
    }),
		columnHelper.accessor('hora_entrada', {
      cell: (info) => (
        <div>
          <span>{info.row.original.hora_entrada}</span>
        </div>
      ),
      header: 'Hora inicio',
    }),
    columnHelper.accessor('hora_salida', {
      cell: (info) => (
        <div>
          <span>{info.row.original.hora_salida}</span>
        </div>
      ),
      header: 'Hora termino',
    }),
    columnHelper.accessor('duracion', {
      cell: (info) => (
        <div>
          <span>{info.row.original.duracion}</span>
        </div>
      ),
      header: 'Duración',
    }),
    columnHelper.display({
      id: 'Actions',
      cell: (info) => (
        <div className='flex justify-center gap-2'>
          <Button
            onClick={() => {
              handleRowClick(info.row.original.ejercicios.grupo_muscular!)
              setExerciseSelected(info.row.original.ejercicios.nombre)
            }}
            variant='solid'
          >
            {
              info.row.original.ejercicios.nombre === exerciseSelected && highlightedMuscle === info.row.original.ejercicios.grupo_muscular
                ? <IoIosEyeOff className='text-3xl'/>
                : <IoIosEye className='text-3xl'/>
            }
          </Button>
        </div>
      ),
      header: 'Acciones',
    })
  ]

  const table = useReactTable({
		data: historiaEjercicios,
		columns,
		state: {
			sorting,
			globalFilter,
		},
		onSortingChange: setSorting,
		enableGlobalFilter: true,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: { pageSize: 7 },
		},
	});

  return (
    <Container breakpoint={null} className='w-full h-full !p-0'>
      <Card className='h-full'>
        <CardBody className='overflow-auto'>
          <TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} hasFooter={false}/>
        </CardBody>
        <TableCardFooterTemplate table={table} />
      </Card>
    </Container>
  )
}

export default TablaHistoricaEjercicio