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
} from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/form/Input';
import TableTemplate, {
	TableCardFooterTemplate,
} from '../../../templates/common/TableParts.template';
import Badge from '../../../components/ui/Badge';

import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../components/layouts/Subheader/Subheader';
import FieldWrap from '../../../components/form/FieldWrap';
import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import { IAsistencia, TMiembro } from '../../../types/miembros/miembros.type';
import { format } from '@formkit/tempo';
import Modal, { ModalBody, ModalHeader } from '../../../components/ui/Modal';
import { RootState } from '../../../store/rootReducer'
import { useAppDispatch, useAppSelector } from '../../../store'
import { useParams } from 'react-router-dom'
import { obtener_asistencia_miembro } from '../../../store/slices/miembros/miembrosPeticiones'

const TablaAsistencia = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('')
  const token = useAppSelector((state: RootState) => state.auth.session)
  const { asistencia_miembro } = useAppSelector((state: RootState) => state.miembro.miembro)

  useEffect(() => {
    if (id){
      dispatch(obtener_asistencia_miembro({ id, token }))
    }
  }, [id])

  const columnHelper = createColumnHelper<IAsistencia>();

  const columns = [

    columnHelper.accessor('fecha_creacion', {
      cell: (info) => (
        <div>
          <span>{format(info.row.original.fecha_creacion)}</span>
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
		data: asistencia_miembro,
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
        <CardHeader>
          {/* <CardHeaderChild>
            <CardTitle>Miembros</CardTitle>
            <Badge
              variant='outline'
              className='border-transparent px-4'
              rounded='rounded-full'>
              {table.getFilteredRowModel().rows.length} items
            </Badge>
          </CardHeaderChild> */}
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
  )
}

export default TablaAsistencia
