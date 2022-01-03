import React, { useMemo, useEffect, useState, useCallback } from 'react';
import {
  DataTable,
  DataTableSkeleton,
  InlineLoading,
  Pagination,
  Search,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableExpandRow,
  TableExpandHeader,
  Tile,
  Tag,
} from 'carbon-components-react';
import {
  useLayoutType,
  useConfig,
  usePagination,
  ConfigurableLink,
  ExtensionSlot,
  formatDatetime,
  parseDate,
} from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';
import { ActiveVisit, useActiveVisits } from './queue.resource';
import jsonData from './testdata.json';
import styles from './queue.scss';
import { EmptyDataIllustration } from './empty-data-illustration.component';

interface PaginationData {
  goTo: (page: number) => void;
  results: Array<ActiveVisit>;
  currentPage: number;
}

const QueueTable = () => {
  const { t } = useTranslation();
  const config = useConfig();
  const layout = useLayoutType();

  const { data: activeVisits, isError, isLoading, isValidating } = jsonData;

  const desktopView = layout === 'desktop';
  const pageSizes = config?.activeVisits?.pageSizes ?? [10, 20, 50];
  const [currentPageSize, setPageSize] = useState(config?.activeVisits?.pageSize ?? 10);
  const [searchString, setSearchString] = useState('');

  const headerData = useMemo(
    () => [
      {
        id: 0,
        header: t('name', 'Name'),
        key: 'name',
      },
      {
        id: 1,
        header: t('priority', 'Priority'),
        key: 'priority',
      },
      {
        id: 2,
        header: t('waitingFor', 'Waiting For'),
        key: 'waitingFor',
      },
      {
        id: 3,
        header: t('waitTime', 'Wait time(mins)'),
        key: 'waitTime',
      },
    ],
    [t],
  );

  const rowData = activeVisits.map((visit) => ({
    ...visit,
    visitStartTime: formatDatetime(parseDate(visit.visitStartTime)),
  }));

  const searchResults = useMemo(() => {
    if (searchString && searchString.trim() !== '') {
      const search = searchString.toLowerCase();
      return rowData.filter((activeVisitRow) =>
        Object.keys(activeVisitRow).some((header) => {
          if (header === 'patientUuid') {
            return false;
          }
          return `${activeVisitRow[header]}`.toLowerCase().includes(search);
        }),
      );
    } else {
      return rowData;
    }
  }, [searchString, rowData]);

  // const {
  //   goTo,
  //   results: paginatedActiveVisits,
  //   currentPage,
  // }: PaginationData = usePagination(searchResults, currentPageSize);

  const handleSearch = useCallback((e) => setSearchString(e.target.value), []);

  // useEffect(() => {
  //   if (currentPage !== 1) {
  //     goTo(1);
  //   }
  // }, [searchString]);

  if (isLoading.loading === 'true') {
    return <DataTableSkeleton role="progressbar" />;
  }
  if (activeVisits?.length) {
    return (
      <div className={styles.activeVisitsContainer}>
        <div className={styles.activeVisitsDetailHeaderContainer}>
          <h4 className={styles.productiveHeading02}>{t('activeVisits', 'Active Visits')}</h4>
          <div className={styles.backgroundDataFetchingIndicator}>
            <span>{isValidating ? <InlineLoading /> : null}</span>
          </div>
        </div>
        <DataTable rows={activeVisits} headers={headerData} isSortable>
          {({ rows, headers, getHeaderProps, getTableProps, getBatchActionProps, getRowProps }) => (
            <TableContainer title="" className={styles.tableContainer}>
              <TableToolbar style={{ marginBottom: '30px' }}>
                <TableToolbarContent>
                  <Search
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                    labelText=""
                    placeholder={t('filterTable', 'Filter table')}
                    onChange={handleSearch}
                  />
                </TableToolbarContent>
              </TableToolbar>
              <Table className={styles.activeVisitsTable} {...getTableProps()} size={desktopView ? 'short' : 'normal'}>
                <TableHead>
                  <TableRow>
                    <TableExpandHeader />
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <React.Fragment key={index}>
                      <TableExpandRow {...getRowProps({ row })}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.info.header === 'name' ? (
                              <ConfigurableLink
                                to={`\${openmrsSpaBase}/patient/${activeVisits?.[index]?.patientUuid}/chart/`}>
                                {cell.value}
                              </ConfigurableLink>
                            ) : (
                              cell.value
                            )}
                            {cell.info.header === 'priority' && cell.value === 'Emergency' ? (
                              <Tag type="red" title="Clear Filter">
                                {cell.value}
                              </Tag>
                            ) : cell.info.header === 'priority' && cell.value === 'Priority' ? (
                              <Tag type="magenta" title="Clear Filter">
                                {cell.value}
                              </Tag>
                            ) : cell.info.header === 'priority' && cell.value === 'Not urgent' ? (
                              <Tag type="green" title="Clear Filter">
                                {cell.value}
                              </Tag>
                            ) : (
                              cell.value
                            )}
                          </TableCell>
                        ))}
                      </TableExpandRow>
                      {row.isExpanded && (
                        <TableRow className={styles.expandedActiveVisitRow}>
                          <th colSpan={headers.length + 2}>
                            <ExtensionSlot
                              className={styles.visitSummaryContainer}
                              extensionSlotName="visit-summary-slot"
                              state={{
                                visitUuid: activeVisits[index]?.visitUuid,
                                patientUuid: activeVisits[index]?.patientUuid,
                              }}
                            />
                          </th>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
              {rows.length === 0 && (
                <p
                  style={{ height: desktopView ? '2rem' : '3rem', marginLeft: desktopView ? '2rem' : '3rem' }}
                  className={`${styles.emptyRow} ${styles.bodyLong01}`}>
                  {t('noVisitsFound', 'No visits found')}
                </p>
              )}
              {/* <Pagination
                forwardText="Next page"
                backwardText="Previous page"
                page={currentPage}
                pageSize={currentPageSize}
                pageSizes={pageSizes}
                totalItems={searchResults.length}
                className={styles.pagination}
                onChange={({ pageSize, page }) => {
                  if (pageSize !== currentPageSize) {
                    setPageSize(pageSize);
                  }
                  if (page !== currentPage) {
                    goTo(page);
                  }
                }}
              /> */}
            </TableContainer>
          )}
        </DataTable>
      </div>
    );
  }
  return (
    <div className={styles.activeVisitsContainer}>
      <Tile light className={styles.tile}>
        <div className={!desktopView ? styles.tabletHeading : styles.desktopHeading}>
          <h4>{t('activeVisits', 'Active Visits')}</h4>
        </div>
        <EmptyDataIllustration />
        <p className={styles.content}>
          {t('noActiveVisitsForLocation', 'There are no active visits to display for this location.')}
        </p>
      </Tile>
    </div>
  );
};

export default QueueTable;
