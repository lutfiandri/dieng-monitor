import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import Plot from 'react-plotly.js';
import { db } from '@/services/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function DevicePage() {
  const [device, setDevice] = useState();

  const { id: deviceId } = useParams();

  useEffect(() => {
    const docRef = doc(db, 'devices', deviceId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const tempData = doc.data();
      tempData.id = deviceId;

      setDevice(tempData);
    });

    return () => unsubscribe();
  }, [deviceId]);

  const timestamps = useMemo(() => {
    return device?.data?.map((d) => d?.timestamp?.toDate());
  }, [device]);

  const formattedTimestamps = useMemo(() => {
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    return timestamps?.map((timestamp) =>
      new Intl.DateTimeFormat('en-US', options).format(timestamp)
    );
  }, [timestamps]);

  const temperatures = useMemo(() => {
    return device?.data?.map((d) => d?.temperature);
  }, [device]);

  const co2s = useMemo(() => {
    return device?.data?.map((d) => d?.co2);
  }, [device]);

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-screen p-4 gap-4">
      <div className="col-start-1 col-end-2 bg-red-100">
        <Plot
          data={[{ type: 'line', x: timestamps, y: co2s }]}
          layout={{ title: 'Carbon Dioxide (CO₂)', 'xaxis.type': 'date' }}
          className="w-full h-full"
          useResizeHandler
        />
      </div>
      <div className="col-start-1 col-end-2 bg-red-100">
        <Plot
          data={[{ type: 'line', x: timestamps, y: temperatures }]}
          layout={{ title: 'Suhu (°C)', 'xaxis.type': 'date' }}
          className="w-full h-full"
          useResizeHandler
        />
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-3 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-right">No.</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>CO₂</TableHead>
              <TableHead>Suhu (°C)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timestamps?.map((timestamp, i) => (
              <TableRow key={i}>
                <TableCell className="text-right">{i + 1}.</TableCell>
                <TableCell>{formattedTimestamps[i]}</TableCell>
                <TableCell>{co2s[i]}</TableCell>
                <TableCell>{temperatures[i]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DevicePage;
