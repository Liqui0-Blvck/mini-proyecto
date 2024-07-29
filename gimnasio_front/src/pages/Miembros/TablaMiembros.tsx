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
import { EstadosMembresia, Miembro } from '../../types/miembros/miembros.type';
import { format } from '@formkit/tempo';

const data: Miembro[] = [
  {
    "perfil": 1,
    "gimnasio": 1,
    "sucursal": 1,
    "fecha_inscripcion": "2023-06-15T10:45:30Z",
    "estado_membresia": EstadosMembresia.Activo,
    "preferencias_entrenamiento": {
      "tipo": "Cardio",
      "frecuencia": "3 veces por semana"
    },
    "objetivos_personales": {
      "peso": "Perder 5 kg",
      "musculatura": "Ganar masa muscular en brazos"
    }
  },
  {
    "perfil": 2,
    "gimnasio": 1,
    "sucursal": 2,
    "fecha_inscripcion": "2023-05-20T08:30:45Z",
    "estado_membresia": EstadosMembresia.Activo,
    "preferencias_entrenamiento": {
      "tipo": "Fuerza",
      "frecuencia": "4 veces por semana"
    },
    "objetivos_personales": {
      "peso": "Mantener peso actual",
      "musculatura": "Incrementar fuerza en piernas"
    }
  },
  {
    "perfil": 3,
    "gimnasio": 2,
    "sucursal": 3,
    "fecha_inscripcion": "2023-07-01T12:00:00Z",
    "estado_membresia": EstadosMembresia.Activo,
    "preferencias_entrenamiento": {
      "tipo": "Yoga",
      "frecuencia": "2 veces por semana"
    },
    "objetivos_personales": {
      "flexibilidad": "Mejorar flexibilidad general",
      "estrés": "Reducir niveles de estrés"
    }
  },
  {
    "perfil": 4,
    "gimnasio": 2,
    "sucursal": 4,
    "fecha_inscripcion": "2023-03-10T15:15:15Z",
    "estado_membresia": EstadosMembresia.Activo,
    "preferencias_entrenamiento": {
      "tipo": "HIIT",
      "frecuencia": "5 veces por semana"
    },
    "objetivos_personales": {
      "resistencia": "Aumentar resistencia cardiovascular",
      "peso": "Perder 3 kg"
    }
  },
  {
    "perfil": 5,
    "gimnasio": 3,
    "sucursal": 5,
    "fecha_inscripcion": "2023-04-22T09:45:00Z",
    "estado_membresia": EstadosMembresia.Activo,
    "preferencias_entrenamiento": {
      "tipo": "Pilates",
      "frecuencia": "2 veces por semana"
    },
    "objetivos_personales": {
      "postura": "Mejorar postura",
      "flexibilidad": "Incrementar flexibilidad"
    }
  },
  {
    "perfil": 6,
    "gimnasio": 3,
    "sucursal": 6,
    "fecha_inscripcion": "2023-01-30T11:00:30Z",
    "estado_membresia": EstadosMembresia.Activo,
    "preferencias_entrenamiento": {
      "tipo": "Crossfit",
      "frecuencia": "4 veces por semana"
    },
    "objetivos_personales": {
      "resistencia": "Aumentar resistencia muscular",
      "fuerza": "Incrementar fuerza general"
    }
  },
  {
    "perfil": 7,
    "gimnasio": 4,
    "sucursal": 7,
    "fecha_inscripcion": "2023-02-14T16:45:45Z",
    "estado_membresia": EstadosMembresia.Activo,
    "preferencias_entrenamiento": {
      "tipo": "Natación",
      "frecuencia": "3 veces por semana"
    },
    "objetivos_personales": {
      "resistencia": "Aumentar capacidad pulmonar",
      "técnica": "Mejorar técnica de natación"
    }
  },
  {
    "perfil": 8,
    "gimnasio": 4,
    "sucursal": 8,
    "fecha_inscripcion": "2023-06-05T14:20:20Z",
    "estado_membresia": EstadosMembresia.Activo,
    "preferencias_entrenamiento": {
      "tipo": "Spinning",
      "frecuencia": "4 veces por semana"
    },
    "objetivos_personales": {
      "resistencia": "Mejorar resistencia cardiovascular",
      "peso": "Perder 2 kg"
    }
  },
  {
    "perfil": 9,
    "gimnasio": 5,
    "sucursal": 9,
    "fecha_inscripcion": "2023-04-18T13:10:10Z",
    "estado_membresia": EstadosMembresia.Activo,
    "preferencias_entrenamiento": {
      "tipo": "Aeróbicos",
      "frecuencia": "3 veces por semana"
    },
    "objetivos_personales": {
      "resistencia": "Aumentar capacidad cardiovascular",
      "estrés": "Reducir niveles de estrés"
    }
  },
  {
    "perfil": 10,
    "gimnasio": 5,
    "sucursal": 10,
    "fecha_inscripcion": "2023-07-20T10:10:10Z",
    "estado_membresia": EstadosMembresia.Activo,
    "preferencias_entrenamiento": {
      "tipo": "Zumba",
      "frecuencia": "3 veces por semana"
    },
    "objetivos_personales": {
      "diversión": "Disfrutar de la actividad física",
      "peso": "Mantener peso actual"
    }
  }
]


const TablaMiembros = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');


  const columnHelper = createColumnHelper<Miembro>();



  const columns = [

    columnHelper.accessor('perfil', {
      cell: (info) => (
        <div>
          <span>{info.row.original.perfil}</span>
        </div>
      ),
      header: 'Miembro',
    }),
    columnHelper.accessor('estado_membresia', {
      cell: (info) => (
        <div>
          <span>{info.row.original.estado_membresia}</span>
        </div>
      ),
      header: 'Estado Membresia',
    }),
    columnHelper.accessor('preferencias_entrenamiento.tipo', {
      cell: (info) => (
        <div>
          <span>{info.row.original.preferencias_entrenamiento.tipo}</span>
        </div>
      ),
      header: 'Preferencias',
    }),
    columnHelper.accessor('fecha_inscripcion', {
      cell: (info) => (
        <div>
          <span>{format(info.row.original.fecha_inscripcion, { date: 'medium', time: 'short' }, 'es' )}</span>
        </div>
      ),
      header: 'Fecha Inscripción',
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
		data,
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
  <PageWrapper name='Lista Miembros'>
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
							placeholder='Miembros...'
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
							<CardTitle>Miembros</CardTitle>
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

export default TablaMiembros
