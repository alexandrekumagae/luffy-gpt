import { convertTimestamp } from '@/utils/date'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table'

interface UploadProps {
  id: string
  filename: string
  uploadDate: string
}

interface UploadsTableProps {
  uploads: UploadProps[]
}

export function UploadsTable({ uploads }: UploadsTableProps) {
  return uploads.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Arquivo</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {uploads &&
          uploads.map((upload: UploadProps, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{upload.id}</TableCell>
              <TableCell>{upload.filename}</TableCell>
              <TableCell>{convertTimestamp(upload.uploadDate)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  ) : (
    <>Nenhum arquivo enviado.</>
  )
}
