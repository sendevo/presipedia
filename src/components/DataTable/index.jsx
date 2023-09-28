import {
    Table, 
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from "@mui/material";

const DataTable = ({title, headers, rows}) => (
    <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <Table size="small">
            <TableHead>
                {title && 
                    <TableRow>
                        <TableCell 
                            colSpan={headers.length} 
                            align="left">
                            <Typography 
                                lineHeight="1em" 
                                fontWeight="bold">
                                {title}
                            </Typography>
                        </TableCell>
                    </TableRow>
                }
                <TableRow>
                    {headers.map((col, index) => (
                        <TableCell 
                            key={index}
                            align="left">  
                            <Typography 
                                lineHeight="1em" 
                                fontWeight="bold" 
                                fontSize={12}>
                                    {col.text}
                            </Typography>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {headers.map((col, index2)=>(
                            <TableCell 
                                key={index*headers.length+index2}
                                width="auto"
                                align="left">
                                    {row[col.key]()}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default DataTable;
