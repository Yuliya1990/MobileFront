import * as React from 'react';
import { Text } from 'react-native-paper';
import { DataTable } from 'react-native-paper';

const CitiesDataTableComponent = ({ items }) => {
  const [page, setPage] = React.useState(0);
  const itemsPerPage = 9;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Id</DataTable.Title>
        <DataTable.Title>Назва</DataTable.Title>
        <DataTable.Title numeric>км. від Києва</DataTable.Title>
        <DataTable.Title numeric>Населення</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>{item.id}</DataTable.Cell>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.distance}</DataTable.Cell>
          <DataTable.Cell numeric>{item.population}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={itemsPerPage}
        numberOfItemsPerPage={itemsPerPage}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default CitiesDataTableComponent;
