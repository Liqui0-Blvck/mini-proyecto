import React, { useEffect, useState } from 'react';
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

interface IHistoriaEjercicios {
  fecha_creacion: string
  hora_entrada: string
  hora_salida: string
  duracion: string
}

const historial: IHistoriaEjercicios[] = []


const TablaHistoricaEjercicio = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('')
  const token = useAppSelector((state: RootState) => state.auth.session)


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
		columnHelper.accessor('hora_entrada', {
      cell: (info) => (
        <div>
          <span>{info.row.original.hora_entrada}</span>
        </div>
      ),
      header: 'Hora de Entrada',
    }),
    columnHelper.accessor('hora_salida', {
      cell: (info) => (
        <div>
          <span>{info.row.original.hora_salida}</span>
        </div>
      ),
      header: 'Hora de Salida',
    }),
    columnHelper.accessor('duracion', {
      cell: (info) => (
        <div>
          <span>{info.row.original.duracion}</span>
        </div>
      ),
      header: 'Duración',
    }),
  ]

  const table = useReactTable({
		data: historial,
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
			pagination: { pageSize: 3 },
		},
	});




  return (
    <Container breakpoint={null} className='w-full h-full !p-0'>
      <Card className='h-full'>
        <CardBody className='overflow-auto'>
          <TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} />
        </CardBody>
        <TableCardFooterTemplate table={table} />
      </Card>
    </Container>
  )
}

export default TablaHistoricaEjercicio