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
} from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Icon from '../../components/icon/Icon';
import Input from '../../components/form/Input';
import TableTemplate, {
  IHeaderConfig,
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
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/layouts/Container/Container';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import { TEjercicio } from '../../types/ejercicios/ejercicios.type';
import { ejercicios } from '../../demos/Ejercicios.demo';
import { capitalizeFirstLetter } from '../../utils/getCapitalize';
import { HeroEye } from '../../components/icon/heroicons';
import { useAppDispatch, useAppSelector } from '../../store';
import { obtener_miembro } from '../../store/slices/miembros/miembrosPeticiones';


const TablaEjercicios = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('')
	const { perfil } = useAppSelector((state) => state.auth.user)
	const { miembro } = useAppSelector((state) => state.miembro.miembro)
  const token = useAppSelector((state) => state.auth.session)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()


  const columnHelper = createColumnHelper<TEjercicio>();

	useEffect(() => {
		dispatch(obtener_miembro({ id: perfil?.id, token }))
	}, [])

	



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
          <span>
            {
              info.row.original.maquina?.nombre
                ? info.row.original.maquina.nombre
                : 'Sin máquina asignada'
            }
          </span>
        </div>
      ),
      header: 'Maquina',
    }),
    columnHelper.accessor('categoria', {
      cell: (info) => (
        <div>
          <span>{capitalizeFirstLetter(info.row.original.categoria)}</span>
        </div>
      ),
      header: 'Categoria',
    }),
    columnHelper.accessor('dificultad', {
      cell: (info) => (
        <div>
          <span>{capitalizeFirstLetter(info.row.original.dificultad)}</span>
        </div>
      ),
      header: 'Dificultad',
    }),
    columnHelper.display({
      id: 'acciones',
      cell: (info) => (
        <div className='flex items-center justify-between gap-2'>
          <Button
            variant='solid'
            title='Ver'
            color='blue'
            onClick={() => {
              navigate(`ejercicio/${info.row.original.id}`)
            }}
            >
              <HeroEye style={{ fontSize: 20 }}/>
          </Button>  
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

  const headerConfig: IHeaderConfig[] = [
    { id: 'acciones', className: 'text-center' },
    // No es necesario proporcionar configuración para todos los encabezados
  ];


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
							Nuevo Ejercicio
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
					</CardHeader>
					<CardBody className='overflow-auto'>
						<TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} headerConfig={headerConfig} />
					</CardBody>
					<TableCardFooterTemplate table={table} />
				</Card>
			</Container>
		</PageWrapper>
  )
}

export default TablaEjercicios