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
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownNavLinkItem,
	DropdownToggle,
} from '../../components/ui/Dropdown';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../components/layouts/Subheader/Subheader';
import FieldWrap from '../../components/form/FieldWrap';
import { Link } from 'react-router-dom';
import Container from '../../components/layouts/Container/Container';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import { format } from '@formkit/tempo';
import { TRutina } from '../../types/rutinas/rutina.type';

const rutinas: TRutina[] = [
  {
    gimnasio: 1,
    nombre: 'Rutina de Fuerza 1',
    miembro: 1,
    entrenador: 1,
    duracion_total: '01:00:00',
    dias_semanales: ['Lunes', 'Miércoles', 'Viernes'],
    objetivos: 'Incrementar fuerza en el tren superior.',
    dificultad: 'intermedio',
    comentarios: 'Enfocarse en técnica.',
    ejercicios: [1, 3, 6]
  },
  {
    gimnasio: 1,
    nombre: 'Rutina de Resistencia 1',
    miembro: 1,
    entrenador: 1,
    duracion_total: '00:45:00',
    dias_semanales: ['Martes', 'Jueves'],
    objetivos: 'Mejorar resistencia cardiovascular.',
    dificultad: 'principiante',
    comentarios: 'Mantener un ritmo constante.',
    ejercicios: [5, 7, 10]
  },
  {
    gimnasio: 1,
    nombre: 'Rutina de Piernas 1',
    miembro: 1,
    entrenador: 1,
    duracion_total: '01:30:00',
    dias_semanales: ['Lunes', 'Jueves'],
    objetivos: 'Desarrollar masa muscular en las piernas.',
    dificultad: 'avanzado',
    comentarios: 'Progresar en pesos cada semana.',
    ejercicios: [2, 4, 9]
  },
  {
    gimnasio: 1,
    nombre: 'Rutina de Core 1',
    miembro: 1,
    entrenador: null,
    duracion_total: '00:30:00',
    dias_semanales: ['Miércoles', 'Sábado'],
    objetivos: 'Fortalecer el core.',
    dificultad: 'intermedio',
    comentarios: 'Enfocarse en la postura.',
    ejercicios: [5, 9, 10]
  },
  {
    gimnasio: 1,
    nombre: 'Rutina de Fuerza 2',
    miembro: 1,
    entrenador: 1,
    duracion_total: '01:00:00',
    dias_semanales: ['Martes', 'Viernes'],
    objetivos: 'Incrementar fuerza en el tren inferior.',
    dificultad: 'intermedio',
    comentarios: 'Enfocarse en técnica.',
    ejercicios: [2, 4, 6]
  },
  {
    gimnasio: 1,
    nombre: 'Rutina de Resistencia 2',
    miembro: 1,
    entrenador: 1,
    duracion_total: '00:45:00',
    dias_semanales: ['Lunes', 'Jueves'],
    objetivos: 'Mejorar resistencia cardiovascular.',
    dificultad: 'principiante',
    comentarios: 'Mantener un ritmo constante.',
    ejercicios: [1, 7, 8]
  },
  {
    gimnasio: 1,
    nombre: 'Rutina de Piernas 2',
    miembro: 1,
    entrenador: 1,
    duracion_total: '01:30:00',
    dias_semanales: ['Miércoles', 'Sábado'],
    objetivos: 'Desarrollar masa muscular en las piernas.',
    dificultad: 'avanzado',
    comentarios: 'Progresar en pesos cada semana.',
    ejercicios: [2, 3, 4]
  },
  {
    gimnasio: 1,
    nombre: 'Rutina de Core 2',
    miembro: 1,
    entrenador: null,
    duracion_total: '00:30:00',
    dias_semanales: ['Lunes', 'Viernes'],
    objetivos: 'Fortalecer el core.',
    dificultad: 'intermedio',
    comentarios: 'Enfocarse en la postura.',
    ejercicios: [5, 8, 9]
  },
  {
    gimnasio: 1,
    nombre: 'Rutina de Fuerza 3',
    miembro: 1,
    entrenador: 1,
    duracion_total: '01:00:00',
    dias_semanales: ['Martes', 'Jueves'],
    objetivos: 'Incrementar fuerza en el tren superior.',
    dificultad: 'intermedio',
    comentarios: 'Enfocarse en técnica.',
    ejercicios: [1, 3, 6]
  },
  {
    gimnasio: 1,
    nombre: 'Rutina de Resistencia 3',
    miembro: 1,
    entrenador: 1,
    duracion_total: '00:45:00',
    dias_semanales: ['Miércoles', 'Sábado'],
    objetivos: 'Mejorar resistencia cardiovascular.',
    dificultad: 'principiante',
    comentarios: 'Mantener un ritmo constante.',
    ejercicios: [7, 8, 10]
  }
];

const TablaRutinas = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');

  const columnHelper = createColumnHelper<TRutina>();

  const columns = [

    columnHelper.accessor('nombre', {
      cell: (info) => (
        <div>
          <span>{info.row.original.nombre}</span>
        </div>
      ),
      header: 'Nombre',
    }),
    columnHelper.accessor('dificultad', {
      cell: (info) => (
        <div>
          <span>{info.row.original.dificultad}</span>
        </div>
      ),
      header: 'Dificultad',
    }),
    columnHelper.accessor('miembro', {
      cell: (info) => (
        <div>
          <span>{info.row.original.miembro}</span>
        </div>
      ),
      header: 'Miembro',
    }),
    columnHelper.display({
      cell: (info) => (
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
		data: rutinas,
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

export default TablaRutinas