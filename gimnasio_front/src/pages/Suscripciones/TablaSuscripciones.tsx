import React, { useState } from 'react';
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
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../components/layouts/Subheader/Subheader';
import FieldWrap from '../../components/form/FieldWrap';
import { Link } from 'react-router-dom';
import Container from '../../components/layouts/Container/Container';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import { TRutina } from '../../types/rutinas/rutina.type';
import { TSuscripcionUsuario } from '../../types/suscripciones/Suscripcion.type';

const suscripciones: TSuscripcionUsuario[] = [
  {
    miembro: 1,
    tipo_membresia: 'Mensual',
    fecha_inicio: '2023-01-01T00:00:00Z',
    fecha_expiracion: '2023-01-31T23:59:59Z',
    activa: true,
    transacciones: [1]
  },
  {
    miembro: 1,
    tipo_membresia: 'Trimestral',
    fecha_inicio: '2023-01-01T00:00:00Z',
    fecha_expiracion: '2023-03-31T23:59:59Z',
    activa: true,
    transacciones: [2]
  },
  {
    miembro: 1,
    tipo_membresia: 'Anual',
    fecha_inicio: '2023-01-01T00:00:00Z',
    fecha_expiracion: '2023-12-31T23:59:59Z',
    activa: true,
    transacciones: [3]
  },
  {
    miembro: 1,
    tipo_membresia: 'Mensual',
    fecha_inicio: '2023-02-01T00:00:00Z',
    fecha_expiracion: '2023-02-28T23:59:59Z',
    activa: false,
    transacciones: [4]
  },
  {
    miembro: 1,
    tipo_membresia: 'Trimestral',
    fecha_inicio: '2023-03-01T00:00:00Z',
    fecha_expiracion: '2023-05-31T23:59:59Z',
    activa: true,
    transacciones: [5]
  }
];

const TablaSuscripciones = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');

  const columnHelper = createColumnHelper<TSuscripcionUsuario>();

  const columns = [

    columnHelper.accessor('miembro', {
      cell: (info) => (
        <div>
          <span>{info.row.original.miembro}</span>
        </div>
      ),
      header: 'Nombre',
    }),
    columnHelper.accessor('tipo_membresia', {
      cell: (info) => (
        <div>
          <span>{info.row.original.tipo_membresia}</span>
        </div>
      ),
      header: 'Dificultad',
    }),
    columnHelper.accessor('activa', {
      cell: (info) => (
        <div>
          <span>{info.row.original.activa}</span>
        </div>
      ),
      header: 'Miembro',
    }),
    columnHelper.display({
      cell: (_info) => (
        <div className='flex items-center gap-2'>
          {/* {info.row.original.socialAuth?.google && (
            <Tooltip text='Google'>
              <Icon size='text-xl' icon='CustomGoogle' />
            </Tooltip>
          )}
          {info.row.original.socialAuth?.facebook && (
            <Tooltip text='Facebook'>
              <Icon size='text-xl' icon='CustomFacebook' />
            </Tooltip>
          )}
          {info.row.original.socialAuth?.apple && (
            <Tooltip text='Apple'>
              <Icon size='text-xl' icon='CustomApple' />
            </Tooltip>
          )} */}
        </div>
      ),
      header: 'Acciones',
    }),
  ]

  const table = useReactTable({
		data: suscripciones,
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
		// debugTable: true,
	});


  return (
  <PageWrapper name='Lista Ejercicios'>
			<Subheader>
				<SubheaderLeft>
					<FieldWrap
						firstSuffix={<Icon className='mx-2' icon='HeroMagnifyingGlass' />}
						lastSuffix={
							globalFilter && (
								<Icon
									icon='HeroXMark'
									color='red'
									className='mx-2 cursor-pointer'
									onClick={() => {
										setGlobalFilter('');
									}}
								/>
							)
						}>
						<Input
							id='example'
							name='example'
							placeholder='Ejercicios...'
							value={globalFilter ?? ''}
							onChange={(e) => setGlobalFilter(e.target.value)}
						/>
					</FieldWrap>
				</SubheaderLeft>
				<SubheaderRight>
					<Link to={`new`}>
						<Button variant='solid' icon='HeroPlus'>
							New Customer
						</Button>
					</Link>
				</SubheaderRight>
			</Subheader>
			<Container breakpoint={null} className='w-full'>
				<Card className='h-full'>
					<CardHeader>
						<CardHeaderChild>
							<CardTitle>Ejercicios</CardTitle>
							<Badge
								variant='outline'
								className='border-transparent px-4'
								rounded='rounded-full'>
								{table.getFilteredRowModel().rows.length} items
							</Badge>
						</CardHeaderChild>
						<CardHeaderChild>
							{/* <Dropdown>
								<DropdownToggle>
									<Button icon='HeroRocketLaunch'>Actions</Button>
								</DropdownToggle>
								<DropdownMenu placement='bottom-end'>
									<div className='grid grid-cols-12 gap-4 divide-zinc-200 dark:divide-zinc-800 md:divide-x'>
										<div className='col-span-12 gap-4 md:col-span-3'>
											<DropdownNavLinkItem to='/' icon='HeroLink'>
												Home Page
											</DropdownNavLinkItem>
											<DropdownNavLinkItem to='/ui/dropdown' icon='HeroLink'>
												Dropdown
											</DropdownNavLinkItem>
											<DropdownItem icon='HeroSquare2Stack'>
												Item 3
											</DropdownItem>
										</div>
										<div className='col-span-12 gap-4 md:col-span-3'>
											<DropdownItem icon='HeroSquare2Stack'>
												Item 4
											</DropdownItem>
											<DropdownItem icon='HeroSquare2Stack'>
												Item 5
											</DropdownItem>
											<DropdownItem icon='HeroSquare2Stack'>
												Item 6
											</DropdownItem>
										</div>
										<div className='col-span-12 gap-4 px-4 md:col-span-6'>
											Lorem ipsum dolor sit amet.
										</div>
									</div>
								</DropdownMenu>
							</Dropdown> */}
						</CardHeaderChild>
					</CardHeader>
					<CardBody className='overflow-auto'>
						<TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} />
					</CardBody>
					<TableCardFooterTemplate table={table} />
				</Card>
			</Container>
		</PageWrapper>
  )

}

export default TablaSuscripciones