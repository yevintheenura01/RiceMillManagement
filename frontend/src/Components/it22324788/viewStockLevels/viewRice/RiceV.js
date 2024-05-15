import React from "react";
import { TableRow, TableCell, Typography } from "@mui/material";

function PaddyView(props) {
  const {
    product_ID,
    bach_NO,
    poroduct_NAME,
    manufacture_DATE,
    expire_DATE,
    weight,
    discription,
  } = props.User || {};

  // Formatting date to display only date without time
  // const formattedDate = new Date(manufacture_DATE).toLocaleDateString();
  // You can apply formatting if needed

  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2">{product_ID}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{bach_NO}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{poroduct_NAME}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{manufacture_DATE}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{expire_DATE}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{weight}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{discription}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default PaddyView;
