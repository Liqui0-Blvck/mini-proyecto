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
import { TMaquina } from '../../types/maquinas/maquinas.type';
import { maquinas } from '../../demos/Maquinas.demo';
import Avatar from '../../components/Avatar';

import background_imagen from '../../assets/white-background.png';
import { useTranslation } from 'react-i18next';
import { HeroEye } from '../../components/icon/heroicons';



const TablaMaquinas = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const { t } = useTranslation();
	const navigate = useNavigate()

  const columnHelper = createColumnHelper<TMaquina>();


  const columns = [
		columnHelper.accessor('imagen', {
			cell: (info) => (
				<div>
					<Avatar 
						src={info.row.original.imagen 
							? info.row.original.imagen 
							: background_imagen}
						rounded='rounded-md' 
						
					/>
				</div>
			),
			header: 'Imagen',
		}),
    columnHelper.accessor('nombre', {
      cell: (info) => (
        <div>
          <span>{info.row.original.nombre}</span>
        </div>
      ),
      header: 'Nombre',
    }),

    columnHelper.accessor('descripcion', {
      cell: (info) => (
        <div>
          <span>{info.row.original.descripcion}</span>
        </div>
      ),
      header: 'Descripción',
    }),
		columnHelper.accessor('grupo_muscular', {
			cell: (info) => (
				<div>
					<span>{t(`gimnasio.${info.row.original.grupo_muscular}`)}</span>
				</div>
			),
			header: 'Grupo Muscular',
		}),
    columnHelper.display({
			id: 'acciones',
      cell: (info) => (
        <div className='flex items-center gap-2'>
					
          <Button
						variant='solid'
						color='blue'
						title='Ver'
						onClick={() => {
							navigate(`maquinas/${info.row.original.id}`);
						}}
						>
							<HeroEye style={{ fontSize: 20 }}/> 
					</Button>
        </div>
      ),
      header: 'Acciones',
    }),
  ]

	const headerConfig: IHeaderConfig[] = [
    { id: 'acciones', className: 'text-center' },
    // No es necesario proporcionar configuración para todos los encabezados
  ];

  const table = useReactTable({
		data: maquinas,
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
  <PageWrapper name='Lista Maquinas'>
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
							placeholder='Maquinas...'
							value={globalFilter ?? ''}
							onChange={(e) => setGlobalFilter(e.target.value)}
						/>
					</FieldWrap>
				</SubheaderLeft>
				<SubheaderRight>
					<Link to={`new`}>
						<Button variant='solid' icon='HeroPlus'>
							Nueva Maquina
						</Button>
					</Link>
				</SubheaderRight>
			</Subheader>
			<Container breakpoint={null} className='w-full'>
				<Card className='h-full'>
					<CardHeader>
						<CardHeaderChild>
							<CardTitle>Maquinas</CardTitle>
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
						<TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} headerConfig={headerConfig} />
					</CardBody>
					<TableCardFooterTemplate table={table} />
				</Card>
			</Container>
		</PageWrapper>
  )
}

export default TablaMaquinas