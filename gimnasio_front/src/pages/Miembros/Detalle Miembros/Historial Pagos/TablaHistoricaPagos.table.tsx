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
import TableTemplate, {
  IHeaderConfig,
	TableCardFooterTemplate,
} from '../../../../templates/common/TableParts.template';
import Badge from '../../../../components/ui/Badge';
import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import { TMiembro } from '../../../../types/miembros/miembros.type';
import { format } from '@formkit/tempo';
import { useAppDispatch, useAppSelector } from '../../../../store';
import Modal, { ModalBody, ModalHeader } from '../../../../components/ui/Modal';
import { obtener_lista_miembros } from '../../../../store/slices/miembros/miembrosPeticiones';
import { MdOutgoingMail } from 'react-icons/md';
import { HeroEye, HeroXMark } from '../../../../components/icon/heroicons';
import { RootState } from '../../../../store/rootReducer';
import { useNavigate } from 'react-router-dom';
import { transacciones } from '../../../../demos/Transacciones.demo';
import { TransaccionPago } from '../../../../types/suscripciones/Suscripcion.type';


const TablaHistoricaPagos = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('')

  
  const columnHelper = createColumnHelper<TransaccionPago>();

  const columns = [
    columnHelper.accessor('fecha_transaccion', {
      cell: (info) => (
        <div>
          <span>{format(info.row.original.fecha_transaccion, { date: 'full', time: 'short' }, 'es' )}</span>
        </div>
      ),
      header: 'Fecha Transacción',
    }),
    columnHelper.accessor('cantidad', {
      cell: (info) => (
        <div>
          <span>{info.row.original.cantidad}</span>
        </div>
      ),
      header: 'Cantidad',
    }),
    columnHelper.accessor('estado', {
      cell: (info) => (
        <div>
          <span>{info.row.original.estado}</span>
        </div>
      ),
      header: 'Estado Transacción',
    }),
    columnHelper.accessor('metodo_pago', {
      cell: (info) => (
        <div>
          <span>{info.row.original.metodo_pago}</span>
        </div>
      ),
      header: 'Método de Pago',
    }),
  ]

  const table = useReactTable({
		data: transacciones,
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
			pagination: { pageSize: 5 },
		},
	})

	const headerConfig: IHeaderConfig[] = [
    { id: 'cantidad', className: 'text-center lg:w-40' },
    { id: 'estado', className: 'lg:w-64' },
    // No es necesario proporcionar configuración para todos los encabezados
  ];

  return (
    <Container breakpoint={null} className='w-full !p-0'>
    <Card className='h-full'>
        <CardHeader>
          <CardHeaderChild>
            <CardTitle>Transacciones</CardTitle>
            <Badge
              variant='outline'
              className='border-transparent px-4'
              rounded='rounded-full'>
              {table.getFilteredRowModel().rows.length} items
            </Badge>
          </CardHeaderChild>
        </CardHeader>
        <CardBody className='overflow-auto'>
          <TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} headerConfig={headerConfig}/>
        </CardBody>
        <TableCardFooterTemplate table={table} />
      </Card>
    </Container>
  )
}

export default TablaHistoricaPagos
