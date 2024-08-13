import React, { Dispatch, SetStateAction, useState } from 'react';
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
} from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Icon from '../../components/icon/Icon';
import Input from '../../components/form/Input';
import TableTemplate, {
	TableCardFooterTemplate,
} from '../../templates/common/TableParts.template';
import Badge from '../../components/ui/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/layouts/Container/Container';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import { TGimnasio } from '../../types/gimnasio/TGimnasio.type';
import { RootState } from '../../store/rootReducer';
import { useAppDispatch, useAppSelector } from '../../store';
import Avatar from '../../components/Avatar';
import { actualizar_gimnasio_activo, eliminar_gimnasio } from '../../store/slices/gimnasio/gimnasioPeticiones';

const TablaGimnasios = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
  const { gimnasios } = useAppSelector((state: RootState) => state.gimnasio.gimnasio)
  const token = useAppSelector((state: RootState) => state.auth.session)
  const dispatch = useAppDispatch()


  const columnHelper = createColumnHelper<TGimnasio>()
  const columns = [
    columnHelper.accessor('logo', {
      cell: (info) => (
        <div>
          <Avatar
            rounded='rounded' 
            src={info.row.original.logo}
            />
        </div>
      ),
      header: 'Logo',
    }),
    columnHelper.accessor('nombre', {
      cell: (info) => (
        <div>
          <span>{info.row.original.nombre}</span>
        </div>
      ),
      header: 'Nombre',
    }),
    
    columnHelper.accessor('telefono', {
      cell: (info) => (
        <div>
          <span>{info.row.original.telefono}</span>
        </div>
      ),
      header: 'Teléfono',
    }),
    columnHelper.accessor('email', {
      cell: (info) => (
        <div>
          <span>{info.row.original.email}</span>
        </div>
      ),
      header: 'Email',
    }),
    columnHelper.display({
      cell: (info) => (
        <div className='flex items-center gap-2 justify-around flex-wrap'>
          <Button
            onClick={() => dispatch(actualizar_gimnasio_activo({ token, data: { gimnasio_id: info.row.original.id} })) }
            variant='solid'
            color={info.row.original.activo ? 'emerald' : 'blue'}
            >
            {info.row.original.activo ? 'Activo' : 'Activar'}
          </Button>

          <Button
            onClick={() => dispatch(eliminar_gimnasio({ token, id: info.row.original.id })) }
            variant='solid'
            color='red'
            >
              Eliminar
          </Button>
  
        </div>
      ),
      header: 'Acciones',
    }),
  ]

  const table = useReactTable({
		data: gimnasios!,
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
	});

  return (
    <Container breakpoint={null} className='w-full'>
      <Card className='h-full'>
        <CardHeader>
          <CardHeaderChild>
            <CardTitle>Gimnasios</CardTitle>
            <Badge
              variant='outline'
              className='border-transparent px-4'
              rounded='rounded-full'>
              {table.getFilteredRowModel().rows.length} items
            </Badge>
          </CardHeaderChild>
        </CardHeader>
        <CardBody className='overflow-auto'>
          <TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} />
        </CardBody>
        <TableCardFooterTemplate table={table} />
      </Card>
    </Container>
  )
}

export default TablaGimnasios
