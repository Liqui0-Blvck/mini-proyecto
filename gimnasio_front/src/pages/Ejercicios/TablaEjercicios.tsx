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
import { Miembro } from '../../types/miembros/miembros.type';
import { format } from '@formkit/tempo';
import { TEjercicio } from '../../types/ejercicios/ejercicios.type';



const ejercicios: TEjercicio[] = [
  {
    gimnasio: 1,
    maquina: 'Press de Banca',
    nombre: 'Press de Banca',
    descripcion: 'Ejercicio para fortalecer el pecho y los tríceps.',
    categoria: 'fuerza',
    subcategoria: 'pecho',
    duracion_estimado: '00:30:00',
    dificultad: 'intermedio',
    video_instructivo: 'ruta/a/press_de_banca.mp4'
  },
  {
    gimnasio: 1,
    maquina: null,
    nombre: 'Sentadilla',
    descripcion: 'Ejercicio para fortalecer las piernas y los glúteos.',
    categoria: 'fuerza',
    subcategoria: 'pierna',
    duracion_estimado: '00:45:00',
    dificultad: 'avanzado',
    video_instructivo: 'ruta/a/sentadilla.mp4'
  },
  {
    gimnasio: 1,
    maquina: 'Curl de Bíceps',
    nombre: 'Curl de Bíceps',
    descripcion: 'Ejercicio para fortalecer los bíceps.',
    categoria: 'fuerza',
    subcategoria: 'brazo',
    duracion_estimado: '00:20:00',
    dificultad: 'principiante',
    video_instructivo: 'ruta/a/curl_de_biceps.mp4'
  },
  {
    gimnasio: 1,
    maquina: 'Press de Pierna',
    nombre: 'Press de Pierna',
    descripcion: 'Ejercicio para fortalecer las piernas.',
    categoria: 'fuerza',
    subcategoria: 'pierna',
    duracion_estimado: '00:30:00',
    dificultad: 'intermedio',
    video_instructivo: 'ruta/a/press_de_pierna.mp4'
  },
  {
    gimnasio: 1,
    maquina: null,
    nombre: 'Plank',
    descripcion: 'Ejercicio para fortalecer el core.',
    categoria: 'resistencia',
    subcategoria: 'core',
    duracion_estimado: '00:05:00',
    dificultad: 'principiante',
    video_instructivo: 'ruta/a/plank.mp4'
  },
  {
    gimnasio: 1,
    maquina: 'Remo',
    nombre: 'Remo',
    descripcion: 'Ejercicio para fortalecer la espalda y los bíceps.',
    categoria: 'fuerza',
    subcategoria: 'espalda',
    duracion_estimado: '00:30:00',
    dificultad: 'intermedio',
    video_instructivo: 'ruta/a/remo.mp4'
  },
  {
    gimnasio: 1,
    maquina: null,
    nombre: 'Burpees',
    descripcion: 'Ejercicio de alta intensidad para todo el cuerpo.',
    categoria: 'cardio',
    subcategoria: 'cuerpo completo',
    duracion_estimado: '00:15:00',
    dificultad: 'avanzado',
    video_instructivo: 'ruta/a/burpees.mp4'
  },
  {
    gimnasio: 1,
    maquina: 'Extensión de Tríceps',
    nombre: 'Extensión de Tríceps',
    descripcion: 'Ejercicio para fortalecer los tríceps.',
    categoria: 'fuerza',
    subcategoria: 'brazo',
    duracion_estimado: '00:25:00',
    dificultad: 'intermedio',
    video_instructivo: 'ruta/a/extension_de_triceps.mp4'
  },
  {
    gimnasio: 1,
    maquina: null,
    nombre: 'Zancadas',
    descripcion: 'Ejercicio para fortalecer las piernas y los glúteos.',
    categoria: 'fuerza',
    subcategoria: 'pierna',
    duracion_estimado: '00:35:00',
    dificultad: 'principiante',
    video_instructivo: 'ruta/a/zancadas.mp4'
  },
  {
    gimnasio: 1,
    maquina: 'Crunches',
    nombre: 'Crunches',
    descripcion: 'Ejercicio para fortalecer el abdomen.',
    categoria: 'resistencia',
    subcategoria: 'core',
    duracion_estimado: '00:10:00',
    dificultad: 'principiante',
    video_instructivo: 'ruta/a/crunches.mp4'
  }
];




const TablaEjercicios = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');


  const columnHelper = createColumnHelper<TEjercicio>();



  const columns = [

    columnHelper.accessor('nombre', {
      cell: (info) => (
        <div>
          <span>{info.row.original.nombre}</span>
        </div>
      ),
      header: 'Nombre',
    }),
    columnHelper.accessor('maquina', {
      cell: (info) => (
        <div>
          <span>{info.row.original.maquina}</span>
        </div>
      ),
      header: 'Estado Membresia',
    }),
    columnHelper.accessor('categoria', {
      cell: (info) => (
        <div>
          <span>{info.row.original.categoria}</span>
        </div>
      ),
      header: 'Preferencias',
    }),
    columnHelper.accessor('dificultad', {
      cell: (info) => (
        <div>
          <span>{info.row.original.dificultad}</span>
        </div>
      ),
      header: 'Fecha Inscripción',
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
		data: ejercicios,
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

export default TablaEjercicios