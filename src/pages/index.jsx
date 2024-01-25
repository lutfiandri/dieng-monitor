import BaseLayout from '@/components/layout/BaseLayout';
import { useEffect, useState } from 'react';
import { db } from '@/services/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'devices'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const devices = [];
      querySnapshot.forEach((doc) => {
        const tempData = doc.data();
        tempData.id = doc.id;
        devices.push(tempData);
      });
      console.log(devices);
      setDevices([...devices]);
    });

    return () => unsubscribe();
  }, [setDevices]);

  return (
    <BaseLayout>
      <div className="flex flex-row flex-wrap">
        {devices.map((device) => (
          <div
            key={device.id}
            onClick={() => navigate('/' + device.id)}
            role="button"
            className="w-52 h-32 grid place-items-center bg-blue-200 rounded-lg hover:bg-blue-300 transition-all duration-200"
          >
            {device?.id}
          </div>
        ))}
      </div>
    </BaseLayout>
  );
}

export default HomePage;
