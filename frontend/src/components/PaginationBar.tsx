import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setPage } from '../state/filtering/filteringSlice'

export function PaginationBar({ total }: { total: number }) {
  const dispatch = useDispatch()
  const { page, pageSize } = useSelector((s: RootState) => s.filtering)
  const count = Math.max(1, Math.ceil(total / pageSize))
  return (
    <Stack alignItems="center" my={2}>
      <Pagination page={page} count={count} onChange={(_, value) => dispatch(setPage(value))} color="primary" />
    </Stack>
  )
}


