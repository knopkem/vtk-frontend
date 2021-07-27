import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import { Config } from '../config';
import { __get } from '../utils';

export default function StudyTable() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'patientName', headerName: 'Patient name', width: 250 },
    { field: 'patientId', headerName: 'MRN', width: 150 },
    { field: 'accession', headerName: 'Accession', width: 170 },
    { field: 'studyDate', headerName: 'Study date', width: 170 },
    { field: 'modality', headerName: 'Modality', width: 170 },
    { field: 'studyDescription', headerName: 'Study description', width: 200 },
    { field: 'uid', headerName: 'Study UID', width: 350 },
  ];

  const history = useHistory();

  const [data, setData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    const abortController = new AbortController();

    try {
      find('', abortController);
    } catch (e) {
      // only call dispatch when we know the fetch was not aborted
      if (!abortController.signal.aborted) {
        console.log(e.message);
      }
    }
    return () => {
      abortController.abort();
    };
  }, []);

  const find = (value, abortController) => {
    const query = `${Config.hostname}:${Config.port}/${Config.qido}/studies?includefield=00081030%2C00080060%2C00080020&StudyDate=19520428-20201008&PatientName=${value}`;
    const options = abortController ? { signal: abortController.signal } : {};
    fetch(query, options)
      .then((response) => response.json())
      .then((data) => {
        const res = data.map((row, index) => {
          return {
            id: index,
            patientName: __get(row, '00100010.Value[0].Alphabetic', 'no name'),
            patientId: __get(row, '00100020.Value[0]', 'no id'),
            accession: __get(row, '00080050.Value[0]', ''),
            studyDate: __get(row, '00080020.Value[0]', ''),
            modality: __get(row, '00080061.Value[0]', ''),
            studyDescription: __get(row, '00081030.Value[0]', ''),
            uid: __get(row, '0020000D.Value[0]', ''),
          };
        });
        setData(res);
      });
  };

  const onSelectionChange = (e) => {
    console.log(e);
    setTimeout(() => {
      const uid = data[e.id].uid;
      const path = `/viewer/${uid}`;
      history.push(path);
    }, 0);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={15} checkboxSelection={false} onRowClick={onSelectionChange} />
    </div>
  );
}
