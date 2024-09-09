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
	TableCardFooterTemplate,
} from '../../templates/common/TableParts.template';
import Badge from '../../components/ui/Badge';

import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../components/layouts/Subheader/Subheader';
import FieldWrap from '../../components/form/FieldWrap';
import Container from '../../components/layouts/Container/Container';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import { TMiembro } from '../../types/miembros/miembros.type';
import { format } from '@formkit/tempo';
import { useAppDispatch, useAppSelector } from '../../store';
import Modal, { ModalBody, ModalHeader } from '../../components/ui/Modal';
import { mandar_correo_confirmacion, obtener_lista_miembros } from '../../store/slices/miembros/miembrosPeticiones';
import { MdOutgoingMail } from 'react-icons/md';
import { HeroEye, HeroXMark } from '../../components/icon/heroicons';
import FormularioMiembro from './FormularioMiembro.form';
import { RootState } from '../../store/rootReducer';
import { obtener_gimnasio } from '../../store/slices/gimnasio/gimnasioPeticiones';
import { obtener_sucursal } from '../../store/slices/surcursal/sucursalPeticiones';
import { useNavigate } from 'react-router-dom';

const TablaMiembros = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('')
  const { miembros } = useAppSelector((state: RootState) => state.miembro.miembro)
  const token = useAppSelector((state: RootState) => state.auth.session)
  const [openModalRegistro, setOpenModalRegistro] = useState(false)

	const { perfil } = useAppSelector((state: RootState) => state.auth.user)
  const { gimnasio } = useAppSelector((state: RootState) => state.gimnasio.gimnasio)
  const { sucursal } = useAppSelector((state: RootState) => state.sucursal.sucursal)

	const navigate = useNavigate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(obtener_lista_miembros({ token }))
  }, [])

	useEffect(() => {
    if (gimnasio === null) {
      dispatch(obtener_gimnasio({ id: perfil?.usuario.id, token }))
    }
  }, [])

  useEffect(() => {
    if(gimnasio){
			dispatch(obtener_sucursal({ id: gimnasio?.id, token }))
		}
  }, [gimnasio])


  const columnHelper = createColumnHelper<TMiembro>();

  const columns = [

    columnHelper.accessor('perfil.usuario.first_name', {
      cell: (info) => (
        <div>
          <span>{info.row.original.perfil.usuario.first_name}</span>
        </div>
      ),
      header: 'Nombre',
    }),
		columnHelper.accessor('perfil.usuario.email', {
      cell: (info) => (
        <div>
          <span>{info.row.original.perfil.usuario.email}</span>
        </div>
      ),
      header: 'Email',
    }),
		
    columnHelper.accessor('estado_membresia', {
      cell: (info) => (
        <div>
          <span>{info.row.original.estado_membresia}</span>
        </div>
      ),
      header: 'Estado Membresia',
    }),
    // columnHelper.accessor('preferencias_entrenamiento.tipo', {
    //   cell: (info) => (
    //     <div>
    //       <span>{info.row.original.preferencias_entrenamiento.tipo}</span>
    //     </div>
    //   ),
    //   header: 'Preferencias',
    // }),
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
        <div className='w-auto flex justify-around gap-2 flex-wrap'>
          {
            !info.row.original.activo
              ? (
                <Button
                  title='Mandar Correo de Confirmación'
                  variant='solid'
                  onClick={() => {
										dispatch(mandar_correo_confirmacion({ id: info.row.original.uid, token }))
									}}
                  >
                    <MdOutgoingMail className='text-2xl'/>
                </Button>
              )
              : null
          }

					<Button
						variant='solid'
						color='blue'
						onClick={() => navigate(`/miembro/${info.row.original.uid}`)}
						>
						<HeroEye style={{ fontSize: 20 }}/>
					</Button>

					<Button
						variant='solid'
						color='red'
						onClick={() => {}}
						>
						<HeroXMark style={{ fontSize: 20 }}/>
					</Button>
        </div>
      ),
      header: 'Acciones',
    }),
  ]

  const table = useReactTable({
		data: miembros,
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
          <Button variant='solid' icon='HeroPlus' onClick={() => setOpenModalRegistro(true)}>
            Nuevo Cliente
          </Button>
          <Modal
            isOpen={openModalRegistro}
            setIsOpen={setOpenModalRegistro}
            size='lg'
            >
            <ModalHeader>
              <span>Registro de Cliente</span>
            </ModalHeader>
            <ModalBody>
              <FormularioMiembro setOpen={setOpenModalRegistro}/>
            </ModalBody>
          </Modal>
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
