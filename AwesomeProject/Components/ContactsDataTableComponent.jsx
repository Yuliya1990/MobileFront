import * as React from 'react';
import { Text } from 'react-native-paper';
import { DataTable } from 'react-native-paper';

const ContactsDataTableComponent = ({ items }) => {
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
        <DataTable.Title>Ім'я</DataTable.Title>
        <DataTable.Title>email</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.email}</DataTable.Cell>
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

export default ContactsDataTableComponent;
